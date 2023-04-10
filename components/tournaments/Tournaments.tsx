import { Button, ProgressBar, Title } from '@/shared'
import { formatNumber } from '@/utils'
import Image from 'next/legacy/image'
import styles from './Tournaments.module.scss'

const Tournaments = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Title
          lightTitle="AI-powered"
          title="Tournaments"
          className={styles.title}
          description="Our AI-powered tournaments offer players a unique opportunity to showcase their skills and compete against others from around the world. With AI play stats, you can analyze player performance and make informed decisions on who to bet on in our tournaments, providing an additional layer of excitement to the game."
        />
        <p>
          Our platform is made to provide you with the best gaming experience possible by providing a special chance to
          demonstrate your abilities and fight against players from all over the globe in AI-powered tournaments.
        </p>
      </div>
      <Button>Play Now</Button>
      <div className={styles.row}>
        <Card
          playerAvatar="/svgs/red-beard.svg"
          type="gold"
          name="redbeard"
          title="necromancer"
          progress={253000}
          level={79}
        />
        <Card
          playerAvatar="/svgs/acolyte.svg"
          type="bronze"
          name="the acolyte"
          title="berseker"
          progress={132000}
          level={44}
        />
      </div>
    </section>
  )
}

export default Tournaments

interface Props {
  playerAvatar: string
  name?: string
  title?: string
  type: 'gold' | 'silver' | 'bronze'
  level?: number
  progress: number
}

const Card = ({ playerAvatar, type, name, title, level, progress }: Props) => {
  return (
    <div className={styles.card} data-animation="resume-card" data-type={type}>
      <figure className={styles.avatar}>
        <Image src={playerAvatar} layout="fill" alt="player" />
      </figure>
      <div className={styles.card_container}>
        {/* <Image src="/svgs/background.svg" layout="fill" alt="" /> */}
        <div className={styles.bio}>
          <figure className={styles.bioicon} data-animation="resume-trophy">
            <Image
              src={type === 'gold' ? '/svgs/gold.svg' : type === 'silver' ? '/svgs/silver.svg' : '/svgs/bronze.svg'}
              alt="player rank"
              loading="lazy"
              layout="fill"
            />
          </figure>
          <p className={styles.biodetails}>
            <span>{name}</span>
            <span>{title}</span>
          </p>
          <div className={styles.small_row}>
            <p>{type}</p>

            <div className={styles.biolevel}>
              <Image src="/svgs/hexagon.svg" layout="fill" alt="" />
              <span>{level}%</span>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.progress}>
            <div className={styles.progress_row}>
              <p className={styles.progresslabel}>
                <span>xp</span>
              </p>
              <p className={styles.progresslabel}>
                <span data-animation="resume-num">{formatNumber(progress)}</span> / {formatNumber(360000)} XP
              </p>
            </div>
            <div className={styles.progresswrap}>
              <ProgressBar
                percent={(progress / 360000) * 100}
                type={type}
                animation="resume-progress"
                className={styles.progressbar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
