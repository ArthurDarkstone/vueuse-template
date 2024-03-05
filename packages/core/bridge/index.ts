import { defaultWindow } from 'utils-vue'
import { getPhoneType } from '../utils'

declare global {
  interface Window extends BridgeNamespace, IOSBridge, AndroidBridge {
    WebViewJavascriptBridge?: {
      init?: (...args: any[]) => any // Only Android
      callHandler(type: string): void
      callHandler(type: string, params: string): void
      callHandler(type: string, params: string, fn?: (json: string) => void): void
    }
  }
}

export type BridgeType = 'Bridge' | string
export type BridgeHandler = string

export interface IOSBridge {
  WVJBCallbacks: ((...args: any[]) => void)[]
}

export interface AndroidBridge {
  WebViewJavascriptBridge: {
    init: (...args: any[]) => any
  }
}

export interface BridgeNamespace {
  [key: string]: Record<string, (...args: any[]) => any>
}

export interface RequestBridge<T = string, D = any> {
  action: T // 请求的方法名称
  body?: D // 对应方法的数据
}

export interface ResponseBridge<T = any> {
  code?: number // 状态码
  data: T // 返回的数据
  msg?: string // 请求成功或失败的信息
}

export interface RegisterConfig {
  namespace?: string
  window?: Window
}

export type RegisterResponse<N extends string = string> = {
  [x in N]: (...args: any[]) => any
} & {
  namespace: any
  namespaceName: N
}

export interface BridgeInterface {
  // return Promise
  request<T extends string = BridgeType, R extends RequestBridge = RequestBridge<BridgeHandler>, D extends ResponseBridge = ResponseBridge>(type: T, data?: R): Promise<D>

  // return Proxy
  register<T extends string = string>(methodName: T, method: (...args: any[]) => any, config?: RegisterConfig): RegisterResponse<T>
}

// Android

// IOS
const { isAndroid, isIOS } = getPhoneType()

export class Bridge implements BridgeInterface {
  private isInit: boolean = false

  public bridge: typeof window.WebViewJavascriptBridge | null = null
  // 判断平台 IOS or Android

  constructor() {
    this.initJsBridgeSync()
  }

  private setupWebViewJavascriptBridge(): Promise<typeof window.WebViewJavascriptBridge> {
    return new Promise((resolve) => {
      if (isAndroid) {
        if (window.ConnectWebViewBridgeSDKInit) // 兼容旧版本
          resolve(window.WebViewJavascriptBridge)

        if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.init) {
          resolve(window.WebViewJavascriptBridge)
        }
        else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            () => {
              resolve(window.WebViewJavascriptBridge)
            },
            false,
          )
        }
      }
      else if (isIOS) {
        if (window.WebViewJavascriptBridge)
          return resolve(window.WebViewJavascriptBridge)

        if (window.WVJBCallbacks)
          return window.WVJBCallbacks.push(resolve)

        window.WVJBCallbacks = [resolve]
        const WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(() => {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      }
    })
  }

  private initJsBridgeSync() {
    try {
      this.setupWebViewJavascriptBridge().then((bridge) => {
        if (window.ConnectWebViewBridgeSDKInit) { // 兼容老版本代码
          this.isInit = true
          this.bridge = window.WebViewJavascriptBridge

          return
        }

        if (isAndroid && !this.isInit && bridge && bridge.init) {
          bridge.init((message: any, responseCallback: any) => {
            // console.log(`JS got a message: ${message}`)
            const data = { 'Javascript Responds': 'Wee!' }
            responseCallback(data)
          })
          this.isInit = true
          this.bridge = bridge
        }
      })
    }
    catch (error) {
      console.error(`错误：${error}`)
    }
  }

  public async initJsBridgeAsync() {
    if (this.isInit)
      return this.bridge

    try {
      const bridge = await this.setupWebViewJavascriptBridge()

      if (isAndroid && !this.isInit && bridge && bridge.init) {
        bridge.init((message: any, responseCallback: any) => {
          const data = { 'Javascript Responds': 'Wee!' }
          responseCallback(data)
        })
        this.isInit = true
      }

      this.bridge = bridge

      return bridge
    }
    catch (error) {
      console.error(`错误：${error}`)
    }
  }

  /**
   * @param {string} type 方法名称: 'Bridge'
   * @param {any} data 数据
   * @description 发送消息给Native
   * @returns Promise<ResponseBridge> 返回一个Promise
   */
  request<T extends string = BridgeType, R extends RequestBridge = RequestBridge, D extends ResponseBridge = ResponseBridge>(type: T, data?: R): Promise<D> {
    return new Promise((resolve, reject) => {
      if (!type)
        throw new Error('请求方法名称不能为空')

      if (!data?.action)
        throw new Error('请求方法名称不能为空')

      if (isAndroid) { // Android
        const requestData: RequestBridge<typeof data.action, typeof data.body> = {
          action: data.action,
          body: data.body,
        }

        if (window.ConnectWebViewBridgeSDK) { // 兼容旧版本
          if (window.ConnectWebViewBridgeSDKInit) { // 如果已经初始化，直接调用
            this.bridge = window.WebViewJavascriptBridge
            this.isInit = true
          }
          else {
            window.ConnectWebViewBridgeSDK.initJsBridge(() => {
              this.bridge = window.WebViewJavascriptBridge
              this.isInit = true

              this.bridge?.callHandler(type, JSON.stringify(requestData), (res: string) => {
                // console.log('Android', res)
                try {
                  if (res) {
                    const responseData = JSON.parse(res)

                    if (responseData.code || responseData.msg)
                      resolve(responseData)

                    resolve({
                      data: responseData, // 返回的数据
                      msg: 'success', // 请求成功或失败的信息
                    } as D)
                  }
                  else {
                    resolve({
                      data: {},
                      msg: 'success',
                    } as D)
                  }

                  resolve({
                    data: {},
                    msg: 'success',
                  } as D)
                }
                catch (error) {
                  console.error(error)
                  // reject(error)
                }
              })
            })
          }
        }
        this.initJsBridgeAsync().then(() => {
          if (!this.bridge)
            return

          this.bridge.callHandler(type, JSON.stringify(requestData), (res: string) => {
            // console.log('Android', res)
            try {
              if (res) {
                const responseData = JSON.parse(res)

                if (responseData.code || responseData.msg)
                  resolve(responseData)

                resolve({
                  data: responseData, // 返回的数据
                  msg: 'success', // 请求成功或失败的信息
                } as D)
              }
              else {
                resolve({
                  data: {},
                  msg: 'error',
                } as D)
              }

              resolve({
                data: {},
                msg: 'success',
              } as D)
            }
            catch (error) {
              console.error(error)

              resolve({
                data: {},
                msg: 'error',
              } as D)

              // reject(error)
            }
          })
        })
      }
      else if (isIOS) { // IOS
        const requestData: RequestBridge<typeof data.action, typeof data.body> = {
          action: data.action,
          body: data.body,
        }

        if (this.bridge) {
          this.bridge.callHandler(type, JSON.stringify(requestData), (res: string) => {
            // console.log('Android', res)
            try {
              const responseData = JSON.parse(res)

              resolve(responseData)
            }
            catch (error) {
              reject(error)
            }
          })
        }
        else {
          reject(new Error('IOS Bridge 未初始化'))
        }
      }
    })
  }

  /**
   * @param {string} method 方法名称
   * @param {RegisterConfig} config 配置
   * @description 注册方法, 返回一个Proxy 代理对象,并将这个Proxy 对象挂在到window上，将方法名称作为window对象的属性，调用方法（window上的Proxy对象）时，会自动调用实际对应的方法
   * @returns Proxy
   */

  register<T extends string = string>(methodName: T, method: (...args: any[]) => any, config: RegisterConfig = { namespace: '', window }): RegisterResponse<T> { // register methodName
    if (!methodName)
      throw new Error('注册方法名称不能为空')

    if (!config.window)
      throw new Error('window 对象不能为空')

    if (typeof method !== 'function')
      throw new Error('注册方法必须是一个函数')

    if (typeof config.namespace !== 'string')
      throw new Error('命名空间必须是一个字符串')

    // 这里直接区分了两种 Native，目前版本其实只有 Android，IOS 还未接入，所以IOS部分采用了相同的代码
    // if (isAndroid) { // Android

    // }
    // else { // IOS

    // }

    const window = defaultWindow

    if (!window)
      throw new Error('window 对象不存在')

    // 增加可读性，采用if 写法
    if (config.namespace === '') { // 此时没有namespace，直接采用 defineProperty 挂载到window上
      const value = new Proxy(method, {
        apply(target, thisArg, argArray) { // 当Native调用JS方法时，会触发这个方法
          // eslint-disable-next-line no-console
          console.log('apply', target, thisArg, argArray)

          // 此处可以做一些拦截操作，如建立订阅发布模式，通知订阅者函数触发并将Native调用JS方法的参数传递给订阅者

          return Reflect.apply(target, thisArg, argArray)
        },
      })

      Object.defineProperty(window, methodName, { // 对已有属性的监听（window），此时推荐使用 Object.defineProperty
        value,
        writable: false,
        configurable: false,
      })

      return {
        [methodName]: window[methodName],
        namespace: config.namespace,
        namespaceName: 'window',
      } as RegisterResponse<T>
    }
    else {
      const value = new Proxy(method, {
        apply(target, thisArg, argArray) { // 当Native调用JS方法时，会触发这个方法
          // eslint-disable-next-line no-console
          console.log('apply', target, thisArg, argArray)

          // 此处可以做一些拦截操作，如建立订阅发布模式，通知订阅者函数触发并将Native调用JS方法的参数传递给订阅者

          return Reflect.apply(target, thisArg, argArray)
        },
      })

      if (!window[config.namespace])
        window[config.namespace] = {}

      Object.defineProperty(window[config.namespace], methodName, { // 对已有属性的监听（window），此时推荐使用 Object.defineProperty
        value,
        writable: false,
        configurable: false,
      })

      return {
        [methodName]: window[config.namespace][methodName],
        namespace: window[config.namespace],
        namespaceName: config.namespace as string,
      } as RegisterResponse<T>
    }
  }
}

export const bridge = new Bridge()

export const request = bridge.request.bind(bridge)
export const register = bridge.register.bind(bridge)
