import { community } from '@/mock'
import { Title } from '@/shared'
import { Community } from '@/types'
import Image from 'next/legacy/image'
import styles from './Community.module.scss'

const Community = () => {
  return (
    <section className={styles.section}>
      <div className={styles.title_container}>
        <Title
          lightTitle="Become a member"
          showIcons={false}
          title="of a diverse and global community."
          description="Join a global community of of gamers, developers, designers, and innovators from around the world, who are working together to shape the future of gaming."
        />
      </div>
      <div className={styles.container}>
        {community.map(({ icon, url, title, description }: Community, index: number) => {
          return <Card key={index} icon={icon} url={url} title={title} description={description} />
        })}
      </div>
      <div className={styles.top_right_container}>
        <div className={styles.top_right}>
          <Image src="/svgs/angle-icon.svg" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.top_left_container}>
        <div className={styles.top_left}>
          <Image src="/svgs/angle-icon.svg" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.bottom_left_container}>
        <div className={styles.bottom_left}>
          <Image src="/svgs/angle-icon.svg" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.bottom_right_container}>
        <div className={styles.bottom_right}>
          <Image src="/svgs/angle-icon.svg" layout="fill" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Community

const Card = ({ icon, title, url, description }: Community) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon && <Image src={icon} layout="fill" alt="" />}</div>
      <div className={styles.block}>
        <a href={url} target="_blank" rel="noreferrer" className={styles.row}>
          <div className={styles.text}>
            <h3>{title}</h3>
          </div>
          <div className={styles.external_icon}>
            <Image src={'/svgs/external.svg'} layout="fill" alt="" />
          </div>
        </a>
        <div className={styles.text}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
