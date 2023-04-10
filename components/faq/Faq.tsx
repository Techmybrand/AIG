import { faq } from '@/mock'
import { Title } from '@/shared'
import Image from 'next/legacy/image'
import React, { useState } from 'react'
import styles from './Faq.module.scss'

const Faq = () => {
  return (
    <section className={styles.section} id="FAQ">
      <div className={styles.title_container}>
        <Title lightTitle="Frequently Asked" title="Questions" showIcons={false} />
        <div className={styles.description}>
          <p>
            Have a question that is not answered? You can contact us at{' '}
            <a href="mailto:support@aigtoken.com">support@aigtoken.com</a>
          </p>{' '}
        </div>
      </div>
      <div className={styles.container}>
        {faq.map(({ title, description }, index) => (
          <Accordion title={title} description={description} key={index} />
        ))}
      </div>
    </section>
  )
}

export default Faq

interface AccordionProps {
  title: string
  description: string
}

const Accordion = ({ title, description }: AccordionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }
  return (
    <div className={styles.accordion} data-active={isActive}>
      <div className={styles.header} onClick={handleClick}>
        <div className={styles.text}>
          <h3>{title}</h3>
        </div>
        {/* <div className={styles.button} data-active={isActive} onClick={() => setIsActive(!isActive)}> */}
        <div className={styles.plus_minus}>
          <div className={!isActive ? styles.plus_sign : styles.minus_sign}></div>
        </div>
        {/* </div> */}
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
