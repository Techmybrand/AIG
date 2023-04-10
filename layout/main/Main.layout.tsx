import React, { ReactNode, ReactElement, useCallback, useEffect } from 'react'
import { deviceType } from '@/utils'
import { Footer, Header } from '@/shared'
import { navLinks } from '@/mock'
import styles from './styles.module.scss'

interface Props {
  children?: ReactNode
}

const Main = ({ children }: Props): ReactElement => {
  const init = useCallback(async () => {
    // check if device is mobile
    const width = window.innerWidth
    const ismobile: boolean = deviceType() === 'mobile' || width <= 700

    // import animations
    const App = (await import('@/animations')).App

    // initialize new animation
    new App({ ismobile })
  }, [])

  useEffect(() => {
    init()
  }, [])
  return (
    <div className={styles.layout} data-scroll-container id="container" data-animation="layout">
      <header className={styles.layout_header}>
        <Header />
      </header>
      <main className={styles.layout_content}>{children}</main>
      <Footer />
    </div>
  )
}

export default Main
