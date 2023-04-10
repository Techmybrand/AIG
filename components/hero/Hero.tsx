import React, { useState } from 'react'
import styles from './Hero.module.scss'

import Image from 'next/image'

import { Title, WaitListInput } from '@/shared'

const Hero = () => {
  return (
    <section id="home" data-nav-section="Home" className={styles.hero} data-animation="hero">
      <div className={styles.hero_section}>
        <p className={styles.hero_supertitle} data-animation="hero-subtitle">
          BUILT ON THE WEB3. POWERED BY YOU
        </p>
        <Title
          titleType="large"
          lightTitle="Discover the Future"
          title="of AI-powered Gaming"
          showIcons={false}
          className={styles.title}
          dataAnimation="hero-title"
        />
        <p className={styles.hero_subtitle} data-animation="hero-text">
          Welcome to AIG Token, where artificial intelligence is at the forefront of our gaming solution. Our platform
          is designed to enhance your gaming experience through the integration of cutting-edge AI technology.
        </p>

        <div data-animation="hero-form" className={styles.hero_form}>
          <WaitListInput />
        </div>
      </div>
    </section>
  )
}

export default Hero
