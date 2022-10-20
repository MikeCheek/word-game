import React, {useEffect, useState} from 'react'
import * as styles from './index.module.scss'
import Lightning from '../../assets/lightning.svg'

const Index = () => {
  const [battery, setBattery] = useState<{
    level: number
    charging: boolean
    chargingTime: number
    discargingTime: number
  }>({level: -1, charging: false, chargingTime: -1, discargingTime: -1})

  const updateBattery = (battery: any) => {
    setBattery({
      level: battery.level,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      discargingTime: battery.discargingTime,
    })
  }

  const getBattery = () => {
    if (window.navigator)
      //@ts-ignore
      window.navigator.getBattery().then((battery) => {
        updateBattery(battery)
        battery.addEventListener('levelchange', () => {
          updateBattery(battery)
        })
        battery.addEventListener('chargingchange', () => {
          updateBattery(battery)
        })
        battery.addEventListener('chargingtimechange', () => {
          updateBattery(battery)
        })
        battery.addEventListener('dischargingtimechange', () => {
          updateBattery(battery)
        })
      })
  }

  useEffect(() => {
    getBattery()
  }, [])

  return battery.level >= 0 ? (
    <>
      <div className={styles.battery} style={{opacity: battery.charging ? 0.8 : 0.7}}>
        <div className={styles.level} style={{width: battery.level * 100 + '%'}}></div>
        <span>
          {battery.level * 100}% {battery.charging ? <Lightning fill="var(--orange)" /> : null}
        </span>
      </div>
      {battery.charging ? (
        Number.isFinite(battery.chargingTime) ? (
          <span>{battery.chargingTime} min</span>
        ) : null
      ) : Number.isFinite(battery.discargingTime) ? (
        <span>{battery.discargingTime} min</span>
      ) : null}
    </>
  ) : (
    <></>
  )
}

export default Index
