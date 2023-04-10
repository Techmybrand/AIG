import { Component } from '../classes/component'
import { Parallax } from '../classes/parallax'
import gsap from 'gsap'

import { eventEmitter } from '@/utils'
import { navLinks } from '@/mock'
import { NavLink } from '@/types'

export class Layout extends Component {
  navMobileTL!: GSAPTimeline
  pauseScale!: boolean
  hamburgerOpen!: boolean
  allNav: NavLink[]

  constructor() {
    super({
      element: "[data-animation='layout']",
      children: {
        header: "[data-animation='header']",
        hamburger: "[data-animation='header-hamburger']",
        navMobile: "[data-animation='header-nav-mobile']",
        navMobileItem: "[data-animation='mobile-navitem']",
        navDiamond1: "[data-animation='nav-diamond-left']",
        navDiamond2: "[data-animation='nav-diamond-right']",
        footer: "[data-animation='footer']",
        logo: "[data-animation='header-logo']",
        cta: "[data-animation='header-cta']",
        nav: "[data-animation='header-nav']",
      },
    })

    this.allNav = navLinks.concat([
      {
        title: 'Resume',
        url: '#quests',
      },
      {
        title: 'Skills',
        url: '#quests',
      },
      {
        title: 'Works',
        url: '#quests',
      },
    ])

    this.revealElements()
    this.createParallax()
    this.reduceHeaderOnScroll()
    this.createNav()
    this.createHamburger()
    this.rotateIcons()
  }

  revealElements() {
    const header: HTMLElement = this.children.header[0]

    gsap.to(header, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  reduceHeaderOnScroll() {
    const header: HTMLElement = this.children.header[0]
    const logo = this.children.logo[0]
    const cta = this.children.cta[0]
    const nav = this.children.nav[0]

    gsap.set(logo, {
      transformOrigin: 'center left',
    })

    gsap.set(cta, {
      transformOrigin: 'center right',
    })

    gsap.to(header, {
      paddingTop: '0.275rem',
      paddingBottom: '0.275rem',
      height: '6rem',
      backgroundColor: '#020204cc',
      scrollTrigger: {
        trigger: this.element,
        start: 'top top-=7rem',
        end: 'top top+=7rem',
        scrub: 0.5,
      },
    })

    ;[logo, nav, cta].forEach((child) => {
      gsap.to(child, {
        scale: 0.8,
        scrollTrigger: {
          trigger: this.element,
          start: 'top top-=7rem',
          end: 'top top+=7rem',
          scrub: 0.5,
        },
      })
    })
  }

  createParallax() {
    new Parallax({
      element: this.children.footer[0],
      children: false,
      defaultParallax: {
        displacement: 100,
      },
    })
  }

  createNav() {
    this.allNav.forEach((link) => {
      const sectSelector = `[data-nav-section='${link.title}']`
      const navSelector = `[data-nav-link-title='${link.url}']`
      const navMobileSelector = `[data-mobile-nav-link-title='${link.url}']`

      if (!link.external) {
        const section = document.querySelector(sectSelector)
        const navLink: HTMLElement | null = document.querySelector(navSelector)
        const navLinkMobile: HTMLElement | null = document.querySelector(navMobileSelector)

        this.handleLinkCicks(link, navLink, navLinkMobile)

        const activate = () => {
          navLink?.setAttribute('data-active', 'true')
          navLinkMobile?.setAttribute('data-active', 'true')
          navLinkMobile?.parentElement?.setAttribute('data-active', 'true')
        }

        const deactivate = () => {
          navLink?.setAttribute('data-active', 'false')
          navLinkMobile?.setAttribute('data-active', 'false')
          navLinkMobile?.parentElement?.setAttribute('data-active', 'false')
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center-=10px',
            end: 'bottom center-=10px',
            onEnter: activate,
            onEnterBack: activate,
            onLeave: deactivate,
            onLeaveBack: deactivate,
          },
        })
      }
    })
  }

  rotateIcons() {
    const icon1 = this.children.navDiamond1[0]
    const icon2 = this.children.navDiamond2[0]

    gsap.to(icon1, {
      rotation: '-=360',
      repeat: -1,
      ease: 'none',
      duration: 2.5,
    })

    gsap.to(icon2, {
      rotation: '+=360',
      repeat: -1,
      ease: 'none',
      duration: 2.5,
    })
  }

  handleLinkCicks(link: any, navLink: HTMLElement | null, navLinkMobile: HTMLElement | null) {
    const target = document.querySelector(link.url)
    const navMobileSelector = `[data-mobile-nav-link-title]`
    const allOtherMobile = document.querySelectorAll(navMobileSelector)

    if (navLink) {
      navLink.onclick = () => {
        target?.scrollIntoView({
          behavior: 'smooth',
          block: link.url === '#tokens' ? 'nearest' : 'center',
        })
      }
    }

    if (navLinkMobile) {
      const deactivate = () => {
        return new Promise<void>((resolve) => {
          allOtherMobile.forEach((item) => {
            item?.setAttribute('data-active', 'false')
            item?.parentElement?.setAttribute('data-active', 'false')
          })

          resolve()
        })
      }

      const activate = () => {
        deactivate().then(() => {
          navLinkMobile?.setAttribute('data-active', 'true')
          navLinkMobile?.parentElement?.setAttribute('data-active', 'true')
        })
      }

      const emit = () => {
        eventEmitter.emit('toggle-hamburger')
        this.hamburgerOut()
      }

      const scrollToTarget = () => {
        target?.scrollIntoView({
          behavior: 'smooth',
          block: link.url === '#tokens' ? 'nearest' : 'center',
        })
      }

      navLinkMobile.onclick = () => {
        const tl = gsap.timeline()

        tl.call(activate)
        tl.call(emit, [], '>0.7')
        tl.call(scrollToTarget, [], '>1.7')
      }
    }
  }

  createHamburger() {
    // initialise hamburger state
    this.hamburgerOpen = false

    // grab elements
    const hamburger: HTMLElement = this.children.hamburger[0]
    const navLink: HTMLElement = this.children.navMobileItem

    gsap.set(navLink, {
      x: '100%',
      autoAlpha: 0,
      transformOrigin: 'center right',
      rotation: '25deg',
    })

    hamburger.onclick = () => {
      eventEmitter.emit('toggle-hamburger')
      this.hamburgerOpen ? this.hamburgerOut() : this.hamburgerIn()
    }
  }

  hamburgerOut() {
    // set status to closed
    this.hamburgerOpen = false

    // reverse timeline
    this.navMobileTL?.reverse()
  }

  hamburgerIn() {
    // set status to open
    this.hamburgerOpen = true

    // play timeline
    if (!this.navMobileTL) {
      const navMobile: HTMLElement = this.children.navMobile[0]
      const navLink: HTMLElement = this.children.navMobileItem

      const tl = gsap.timeline()

      tl.to(navMobile, {
        autoAlpha: 1,
        x: 0,
        ease: 'expo.inOut',
        duration: 1.2,
      })

      tl.to(
        navLink,
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.1,
          rotation: 0,
          ease: 'elastic.out(0.5, 0.5)',
          duration: 1.2,
        },
        '<',
      )

      this.navMobileTL = tl
    }

    this.navMobileTL?.play()
  }
}
