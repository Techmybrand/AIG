import React, { ReactNode, ReactElement, useCallback, useEffect } from 'react'
import { deviceType } from '@/utils'
import { Footer, Header } from '@/shared'
import { navLinks } from '@/mock'
import styles from './styles.module.scss'

interface Props {
  children?: ReactNode
}

const Main = ({ children }: Props): ReactElement => {
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
