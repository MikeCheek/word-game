import React from 'react'
import * as styles from './index.module.scss'

const Index = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
    </div>
  )
}

export default Index
