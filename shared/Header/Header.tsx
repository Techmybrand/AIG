import { navLinks } from '@/mock'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Logo, Button } from '@/shared'
import styles from './Header.module.scss'
import { scrollTo } from '@/utils'
import Image from 'next/legacy/image'
import { NavLink } from '@/types'

const Header = () => {
  const router = useRouter()
  const [scroll, setScroll] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [dropDown, setDropDown] = useState<boolean>(false)
  const ref = useRef<any>(null)
  const handleNavClick = (id: string) => {
    scrollTo({ id })
    setCollapsed(true)
  }

  const toggling = (event: React.MouseEvent) => {
    setDropDown(!dropDown)
    event.stopPropagation()
  }

  // useEffect(() => {
  //   const element = ref.current
  //   const navList = element?.children[1].children[0].children[0].childNodes
  //   if (typeof document !== 'undefined') {
  //     const sections = document.querySelectorAll('section')
  //     const navLi = document.querySelectorAll('li')
  //     window.onscroll = () => {
  //       let current: any = ''

  //       sections.forEach((section) => {
  //         const sectionTop = section.offsetTop
  //         if (scrollY >= sectionTop - 150) {
  //           current = section.getAttribute('id')
  //         }
  //       })

  //       navList?.forEach((li: any) => {
  //         // console.log(current)
  //         // if (scrollY == 0) {
  //         //   if (li.classList.contains('home')) {
  //         //     li.classList.add('active-nav')
  //         //   }
  //         // }else{

  //         // }
  //         li.classList.remove('active-nav')
  //         if (li.classList.contains(current)) {
  //           li.classList.add('active-nav')
  //         }
  //       })
  //     }
  //     // console.log(navList)
  //   }
  // }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setDropDown(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const checkActive = (url: string) => {
    let isActive = url === router.pathname
    return isActive
  }
  return (
    <header className={`${styles.header} ${scroll ? styles.header_scrolled : ''}`} ref={ref}>
      <Link href="/">
        <div className={styles.header_logoContainer} onClick={() => setCollapsed(true)}>
          <Logo />
        </div>
      </Link>
      <div className={styles[!collapsed ? 'header_wrapper' : 'header_wrapper__collapsed']}>
        <nav className={styles.header_nav}>
          <ul className={styles.header_navList}>
            {navLinks.map(({ title, external, url }: NavLink, index) => {
              return (
                <li
                  key={index}
                  className={`${styles.header_navLink} ${title}`}
                  // onClick={() => handleNavClick(title)}
                  data-active={checkActive(url)}
                >
                  {external ? (
                    <a href={url} rel="noreferrer" target="_blank">
                      {title}
                    </a>
                  ) : (
                    <Link href="/">{title}</Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles.button_container}>
          <a href="#" target="_blank" rel="noreferrer">
            <Button className={styles.button}>Get AIG Token</Button>
          </a>
          {/* <Button className={styles.button}>Log In</Button> */}
        </div>
      </div>
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={styles[collapsed ? 'header_hamburger' : 'header_hamburger__open']}
      >
        <span className={styles.header_hamburgerBar}></span>
        <span className={styles.header_hamburgerBar}></span>
      </div>
    </header>
  )
}

export default Header
