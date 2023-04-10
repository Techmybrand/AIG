import React from 'react'
import styles from './Title.module.scss'

interface Props {
  title?: string
  lightTitle?: string
  titleType?: 'small' | 'large'
  showIcons?: boolean
  className?: string
  description?: string
  dataAnimation?: string
}

const Title = ({
  title,
  lightTitle,
  titleType = 'small',
  showIcons = true,
  className,
  description,
  dataAnimation,
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} data-animation={dataAnimation}>
      <div className={styles.row}>
        {showIcons && (
          <figure className={styles.icon}>
            <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                data-animation="quests-caret"
                d="M15.4507 29.3327L22.1174 15.9993L15.4507 2.66602L20.784 2.66602L27.4507 15.9993L20.784 29.3327H15.4507Z"
                fill="#FFC107"
              />
              <path
                data-animation="quests-caret"
                d="M6.11768 29.3327L12.7843 15.9993L6.11768 2.66602H11.451L18.1177 15.9993L11.451 29.3327H6.11768Z"
                fill="#FFA000"
              />
            </svg>
          </figure>
        )}
        <div className={styles.title} data-type={titleType}>
          <h1>
            <span>{lightTitle}</span> {title}
          </h1>
        </div>
        {showIcons && (
          <figure className={styles.icon} style={{ rotate: '180deg' }}>
            <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                data-animation="quests-caret"
                d="M15.4507 29.3327L22.1174 15.9993L15.4507 2.66602L20.784 2.66602L27.4507 15.9993L20.784 29.3327H15.4507Z"
                fill="#FFC107"
              />
              <path
                data-animation="quests-caret"
                d="M6.11768 29.3327L12.7843 15.9993L6.11768 2.66602H11.451L18.1177 15.9993L11.451 29.3327H6.11768Z"
                fill="#FFA000"
              />
            </svg>
          </figure>
        )}
      </div>
      {description && (
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      )}
    </div>
  )
}

export default Title
