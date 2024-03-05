---
category: Bridge
alias: bridge
---

# bridge

本实例对象用于在 webview 和 native 之间建立通信，可引入`await bridge.request`实例对象进行通信，也可直接使用`request`和`register`方法进行通信。

## Usage

基本使用

```ts
import { bridge } from 'utils-core'

const responseData = await bridge.request('xxxJS', { action: 'xxxAction' })
```

请求Native

```ts
import { request } from 'utils-core'

const data: RequestBridge<'getHeadInfoHandler'> = {
  action: 'getHeadInfoHandler',
}

const responseData = await request('getHeadInfoHandler', data)
```

注册Native -> JS 的事件

```ts
import { register } from 'utils-core'

const { getInfoFromNative, namespace, namespaceName } = register<'getInfoFromNative'>('getInfoFromNative', (data: any) => {
  // some code

  // 如建立订阅-发布
  ee.emit('getInfo', data)
}, {
  // some options
  namespace: 'bridge',
  window
})
```
