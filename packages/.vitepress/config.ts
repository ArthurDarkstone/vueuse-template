import { defineConfig } from 'vitepress'
import { addonCategoryNames, categoryNames, coreCategoryNames, metadata } from '../metadata/metadata'
import { currentVersion, versions } from '../../meta/versions'

const Guide = [
  { text: 'Get Started', link: '/guide/' },
  // { text: 'Best Practice', link: '/guide/best-practice' },
  // { text: 'Configurations', link: '/guide/config' },
  // { text: 'Components', link: '/guide/components' },
  // { text: 'Contributing', link: '/contributing' },
  // { text: 'Guidelines', link: '/guidelines' },
]

const CoreCategories = coreCategoryNames.map(c => ({
  text: c,
  activeMatch: '___', // never active
  link: `/functions#category=${c}`,
}))

const AddonCategories = [
  ...addonCategoryNames
    .map(c => ({
      text: c.slice(1),
      activeMatch: '___', // never active
      link: `/functions#category=${encodeURIComponent(c)}`,
    })),
]

// const Links = [
//   { text: 'Add-ons', link: '/add-ons' },
//   { text: 'Ecosystem', link: '/ecosystem' },
//   { text: 'Export Size', link: '/export-size' },
//   { text: 'Recent Updated', link: '/functions.html#sort=updated' },
//   { text: 'Why no translations?', link: '/why-no-translations' },
// ]

// const Learn = [
//   { text: 'Premium Video Course', link: 'https://vueschool.io/courses/utils-for-everyone?friend=utils' },
//   { text: 'Official Vue Certification', link: 'https://certification.vuejs.org/?utm_source=utils&utm_medium=website&utm_campaign=affiliate&utm_content=guide&banner_type=text&friend=VUEUSE' },
// ]

const DefaultSideBar = [
  { text: 'Guide', items: Guide },
  { text: 'Core Functions', items: CoreCategories },
  // { text: 'Add-ons', items: AddonCategories },
  // { text: 'Learn', items: Learn },
  // { text: 'Links', items: Links },
]

const FunctionsSideBar = getFunctionsSideBar()

export default defineConfig({
  title: 'utils',
  description: 'Collection of essential Vue Composition Utilities',
  lang: 'en-US',
  ignoreDeadLinks: true,

  // change to package scripts
  // base: '/utils/',

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },

  themeConfig: {
    logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/ArthurDarkstone/vueuse-template/tree/main/packages/:path',
      text: 'Suggest changes to this page',
    },

    footer: {
      message: 'VueUse Template',
      copyright: 'Copyright © 2024 ArthurDarkstone',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArthurDarkstone/vueuse-template' },
    ],

    nav: [
      {
        text: 'Guide',
        items: [
          { text: 'Guide', items: Guide },
          // { text: 'Learn', items: Learn },
          // { text: 'Links', items: Links },
        ],
      },
      {
        text: 'Functions',
        items: [
          {
            text: '',
            items: [
              { text: 'All Functions', link: '/functions#' },
              { text: 'Recent Updated', link: '/functions#sort=updated' },
            ],
          },
          { text: 'Core', items: CoreCategories },
          { text: 'Add-ons', items: AddonCategories },
        ],
      },
      {
        text: currentVersion,
        items: [
          {
            items: [
              { text: 'Release Notes', link: 'https://github.com/ArthurDarkstone/vueuse-template/releases' },
            ],
          },
          {
            text: 'Versions',
            items: versions.map(i => i.version === currentVersion
              ? {
                  text: `${i.version} (Current)`,
                  activeMatch: '/', // always active
                  link: '/',
                }
              : {
                  text: i.version,
                  link: '/', // i.link
                }),
          },
        ],

      },
    ],
    sidebar: {
      '/guide/': DefaultSideBar,
      '/contributing': DefaultSideBar,
      '/guidelines': DefaultSideBar,
      '/export-size': DefaultSideBar,
      '/functions': FunctionsSideBar,
      '/core/': FunctionsSideBar,
      '/vue/': FunctionsSideBar,
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'ArthurDarkstone' }],
    ['meta', { property: 'og:title', content: 'VueUse' }],
    ['meta', { property: 'og:image', content: 'https://utils.org/og.png' }],
    ['meta', { property: 'og:description', content: 'Collection of essential Vue Composition Utilities' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
  ],
})

function getFunctionsSideBar() {
  const links = []

  for (const name of categoryNames) {
    if (name.startsWith('_'))
      continue

    const functions = metadata.functions.filter(i => i.category === name && !i.internal)

    links.push({
      text: name,
      items: functions.map(i => ({
        text: i.name,
        link: i.external || `/${i.package}/${i.name}/`,
      })),
      link: name.startsWith('@')
        ? (functions[0].external || `/${functions[0].package}/README`)
        : undefined,
    })
  }

  return links
}
