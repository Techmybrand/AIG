import React from 'react'
import styles from './ProgressBar.module.scss'

interface Props {
  className: string
  type: 'gold' | 'silver' | 'bronze'
  percent: number
  showPercent?: boolean
  animation?: string
}

const ProgressBar = ({ className, type, percent, showPercent, animation }: Props) => {
  return (
    <div className={styles.progress}>
      <div className={`${styles.progress_inner} ${className}`} data-type={type}>
        <div
          data-type={type}
          data-animation={animation}
          className={styles.progress_bar}
          style={{ width: `${percent}%` }}
        >
          {showPercent && `${percent}%`}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
