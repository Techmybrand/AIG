import { Button, Title } from '@/shared'
import Image from 'next/legacy/image'
import { useEffect, useState } from 'react'
import styles from './Statistics.module.scss'

const Statistics = () => {
  const [ismobile, setIsmobile] = useState<boolean>(true)
  useEffect(() => {
    if (window.innerWidth > 650) {
      setIsmobile(false)
      return
    }

    setIsmobile(true)
    return
  }, [])
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Title
          lightTitle="AI Play"
          title="Statistics"
          className={styles.title}
          description="Analyze player performance and make informed decisions on who to bet on in our tournaments, providing an additional layer of excitement to the game."
        />
        <p>
          Our AI technology provides accurate and up-to-date play stats, giving you a competitive edge in our
          tournaments. You can track your own progress and compare your stats to other players, giving you valuable
          insights on your own gameplay.
        </p>
      </div>
      <Button>Enter Game Arena</Button>
      <div className={styles.globe}>
        <Image src={ismobile ? '/svgs/globe-mob.svg' : '/svgs/globe.svg'} layout="fill" alt="" />
      </div>
    </section>
  )
}

export default Statistics
