import { resolve } from 'node:path'

// import process from 'node:process'
import { createRequire } from 'node:module'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VitePWA as PWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

// import { getChangeLog, getFunctionContributors } from '../scripts/changelog'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'

// import { ChangeLog } from './.vitepress/plugins/changelog'
// import { Contributors } from './.vitepress/plugins/contributors'

const require = createRequire(import.meta.url)

export default defineConfig(async () => {
  // const [contributions] = await Promise.all([
  //   getChangeLog(process.env.CI ? 1000 : 100),
  //   getFunctionContributors(),
  // ])

  // const base = '/vueuse-template/' // only for GitHub Pages

  return <UserConfig>{
    // base,
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
      host: true,
    },
    plugins: [
      // custom
      MarkdownTransform(),
      // ChangeLog(changeLog),
      // Contributors(contributions),

      // plugins
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      Icons({
        compiler: 'vue3',
        defaultStyle: 'display: inline-block',
      }),
      PWA({
        outDir: '.vitepress/dist',
        manifest: {
          name: 'utils',
          short_name: 'utils',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      UnoCSS(),
      Inspect(),
    ],
    resolve: {
      alias: {
        'utils-core': resolve(__dirname, 'core/index.ts'),
        'utils-vue': resolve(__dirname, 'vue/index.ts'),
        'utils-components': resolve(__dirname, 'components/index.ts'),
        'utils-metadata': resolve(__dirname, 'metadata/index.ts'),
        'utils-docs-utils': resolve(__dirname, '.vitepress/plugins/utils.ts'),
      },
      dedupe: [
        'vue',
        'vue-demi',
        '@vue/runtime-core',
      ],
    },
    optimizeDeps: {
      exclude: [
        'vue-demi',
        'utils-core',
        'utils-vue',
        'body-scroll-lock',
      ],
      include: [
        'axios',
        'js-yaml',
        'nprogress',
        'qrcode',
        'tslib',
        'fuse.js',
        'universal-cookie',
      ],
    },
    css: {
      postcss: {
        plugins: [
          require('postcss-nested'),
        ],
      },
    },
  }
})
