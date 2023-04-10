import Image from 'next/legacy/image'
import React from 'react'
import styles from './Sponsors.module.scss'

const Sponsors = () => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <h3>Backed by</h3>
      </div>
      <div className={styles.row}>
        <div className={styles.icon}>
          <Image src="/svgs/ribbit.svg" layout="fill" alt="Ribbit Capital" />
        </div>
        <div className={styles.icon}>
          <Image src="/svgs/ventures.svg" layout="fill" alt="True Ventures" />
        </div>
        <div className={styles.icon}>
          <Image src="/svgs/nascent.svg" layout="fill" alt="Nascent" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.icon}>
          <Image src="/svgs/arrows.svg" layout="fill" alt="Ribbit Capital" />
        </div>
        <div className={styles.icon}>
          <Image src="/svgs/parafi.svg" layout="fill" alt="True Ventures" />
        </div>
      </div>
    </section>
  )
}

export default Sponsors
