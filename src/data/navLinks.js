const descriptionText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit.'

exports.navLinks = [
  {
    title: 'Home',
    url: '/',
    hasSubmenu: false
  },
  {
    title: 'News',
    url: '/news',
    hasSubmenu: false
  },
  {
    title: 'About',
    url: '/about',
    hasSubmenu: false
  },
  {
    title: 'Contact',
    url: '/contact',
    hasSubmenu: false
  },
  {
    title: 'Advertise',
    url: '/advertise',
    hasSubmenu: true,
    submenu: [
      {
        title: 'Banner Ads',
        description: descriptionText,
        icon:
          'M13.35,20l0.57,2H5c-1.11,0-2-0.9-2-2L3.01,6c0-1.1,0.88-2,1.99-2h1V2h2v2h8V2h2v2h1c1.1,0,2,0.9,2,2v8.92l-2-0.57V10H5v10 H13.35z M21.71,21.29l-3.22-3.22L21,17l-7-2l2,7l1.08-2.51l3.22,3.22L21.71,21.29z M12,17v-5H7v5H12z',
        url: '/advertise/bannery-ads'
      },
      {
        title: 'Classifieds',
        description: descriptionText,
        icon:
          'M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z',
        url: '/advertise/classifieds'
      },
      {
        title: 'Events',
        description: descriptionText,
        icon:
          'M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z',
        url: '/advertise/events'
      },
      {
        title: 'Press Releases',
        description: descriptionText,
        icon:
          'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
        url: '/advertise/press-releases'
      }
    ]
  }
]
