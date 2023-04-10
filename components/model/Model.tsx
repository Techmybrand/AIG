import { Button, Title } from '@/shared'
import Image from 'next/legacy/image'
import styles from './Model.module.scss'

const Model = () => {
  return (
    <section className={styles.container}>
      <div className={styles.block}>
        <Title
          lightTitle="Play-to-earn"
          title="Model"
          className={styles.title}
          description="We offer players the opportunity to earn rewards through our play-to-earn model. Our native token allows you to participate in tournaments and bet on other players, giving you the chance to earn rewards for your gaming prowess."
        />
        <Button>Enter Game Arena</Button>
      </div>
      <div className={styles.icon}>
        <Image src="/svgs/coin.svg" alt="" layout="fill" />
      </div>
    </section>
  )
}

export default Model
