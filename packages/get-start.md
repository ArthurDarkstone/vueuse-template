---
outline: deep
---

# 起步

## 安装

```bash
 pnpm i utils-core utils-vue
```

## 使用

```vue
<script setup>
import { useHeadInfo, useNativeMessage, useReport } from 'utils-vue'

const params = { action: 'getHeadInfoHandler' }

// vue hooks
const { headInfo } = useHeadInfo()
const { status, data, send } = useReport({ /** configs */})

const { hide, close } = useWebViewMessage('barStatus')
```

## API

    见各个模块的文档
