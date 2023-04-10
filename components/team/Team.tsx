import { team } from '@/mock'
import { Title } from '@/shared'
import { Team } from '@/types'
import Image from 'next/legacy/image'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Team.module.scss'

const Team = () => {
  return (
    <section className={styles.section}>
      <Title
        title="Team"
        lightTitle="The"
        description="Meet our team of creative professionals"
        showIcons={false}
        className={styles.title}
      />
      <div className={styles.container}>
        {team.map((member: Team, index: number) => (
          <Card key={index} member={member} />
        ))}
      </div>
    </section>
  )
}

export default Team

interface Props {
  member: Team
}

const Card = ({ member }: Props) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsFlipped(true)
  }

  const handleMouseLeave = () => {
    setIsFlipped(false)
  }
  return (
    <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CSSTransition in={!isFlipped} timeout={300} classNames="card-front" unmountOnExit>
        <Image src={member.icon} layout="fill" alt="" />
      </CSSTransition>
      <CSSTransition in={isFlipped} timeout={300} classNames="card-back" unmountOnExit>
        <div className={styles.details}>
          <div className={styles.details_block}>
            <h3>{member.name}</h3>
            <h4>{member.title}</h4>
            <div className={styles.socials}>
              <a href={member.socials.linkedIn} target="_blank" rel="noreferrer" className={styles.socials_icon}>
                <Image src={'/svgs/linkedin.svg'} layout="fill" alt="" />
              </a>
              <a href={member.socials.twitter} target="_blank" rel="noreferrer" className={styles.socials_icon}>
                <Image src={'/svgs/twitter.svg'} layout="fill" alt="" />
              </a>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
