import { Title, WaitListInput } from '@/shared'
import styles from './WaitList.module.scss'

const WaitList = () => {
  return (
    <section className={styles.section}>
      <Title lightTitle="Join" title="the waitlist" showIcons={false} className={styles.title} />
      <WaitListInput />
      <div className={styles.text}>
        <p>
          By joining, I agree to the <a href="#">Terms of Use</a>
        </p>
      </div>
    </section>
  )
}

export default WaitList
