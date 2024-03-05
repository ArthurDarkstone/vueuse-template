import { ref, watch } from 'vue-demi'
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import { defaultDocument } from '../_configurable'

export function useWatermask() {
  const container = ref(defaultDocument?.body)
  const zIndex = ref(21186)
  const width = ref(`${232}px`)
  const height = ref(`${232}px`)
  const rotate = ref('-15')
  const textAnchor = ref('middle')
  const alignmentBaseline = ref('middle')
  const fill = ref('rgba(0, 0, 0, 0.1)')
  const fontWidth = ref('normal')
  const fontSize = ref('14px')
  const fontFamily = ref('\'PingFang SC\', \'Microsoft YaHei\', \'Helvetica Neue\', Helvetica, Arial, sans-serif')
  const opacity = ref(0.3)
  const content = ref('请设置水印文案')
  const domClassName = ref('watermarkDom')

  let watermarkObserver: MutationObserver | null = null

  tryOnMounted(() => {
    handleWatermark()
    // Watch for changes in reactive properties and update the watermark accordingly
    watch(
      [
        container,
        zIndex,
        width,
        height,
        rotate,
        textAnchor,
        alignmentBaseline,
        fill,
        fontWidth,
        fontSize,
        fontFamily,
        opacity,
        content,
        domClassName,
      ],
      handleWatermark,
    )
  })

  tryOnBeforeUnmount(() => {
    clearWatermark()
  })

  function handleWatermark() {
    const SIZE = 232
    const HALF_SIZE = SIZE / 2

    const svgStr = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width.value}" height="${height.value}" style="transform: rotate(${rotate.value}deg); opacity:${opacity.value}">
        <text xmlns="http://www.w3.org/2000/svg" x="50%" y="50%"
          text-anchor="${textAnchor.value}"
          alignment-baseline="${alignmentBaseline.value}"
          fill="${fill.value}"
          font-weight="${fontWidth.value}"
          font-family="${fontFamily.value}"
          style="font-size: ${fontSize.value};"
        >
          ${content.value}
        </text>
      </svg>
    `

    const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`

    const watermarkDom = defaultDocument?.querySelector(`.${domClassName.value}`)
    const watermarkDiv = watermarkDom || defaultDocument?.createElement('div')
    const styleStr = `
      z-index:${zIndex.value};
      position:fixed;
      pointer-events:none;
      height:100%;
      width:100%;
      top:0;
      left:0;
      background-image:url('${base64Url}'),url('${base64Url}');
      background-position: 0px 0px,${HALF_SIZE}px ${HALF_SIZE}px;
      transform: translate3d(0,0,0);
    `

    watermarkDiv?.classList.add(domClassName.value)
    watermarkDiv?.setAttribute('style', styleStr)

    if (!watermarkDom) {
      container.value && (container.value.style.position = 'relative')
      container.value && (container.value.insertBefore(watermarkDiv!, container.value.lastChild))
    }

    if (watermarkObserver)
      watermarkObserver.disconnect()

    // Watch for changes in the container and reapply the watermark if needed
    watermarkObserver = new MutationObserver(() => {
      handleWatermark()
    })

    watermarkObserver.observe(container.value!, {
      attributes: true,
      subtree: true,
      childList: true,
    })
  }

  function clearWatermark() {
    const watermarkDom = defaultDocument?.querySelector(`.${domClassName.value}`)
    if (watermarkDom)
      watermarkDom.remove()

    if (watermarkObserver) {
      watermarkObserver.disconnect()
      watermarkObserver = null
    }
  }

  return {
    container,
    zIndex,
    width,
    height,
    rotate,
    textAnchor,
    alignmentBaseline,
    fill,
    fontWidth,
    fontSize,
    fontFamily,
    opacity,
    content,
    domClassName,
    clearWatermark,
  }
}
