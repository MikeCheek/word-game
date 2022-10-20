import React from 'react'
import * as styles from './index.module.scss'
import GameSettingsProps from './index.types'

const Index = ({
  increase,
  decrease,
  changeLanguage,
  language,
  inputRef,
  setError,
  error,
  setShowBattery,
  showBattery,
  started,
  regexp,
  checkRegexp,
  length,
}: GameSettingsProps) => {
  return (
    <div className={styles.settings}>
      <div className={styles.max}>
        <div className={styles.text}>
          <p>Max word length is</p>
        </div>

        <div className={styles.buttons}>
          <button onClick={increase}>{`>`}</button>
          <span>{length}</span>
          <button onClick={decrease}>{`<`}</button>
        </div>
      </div>
      <div className={styles.language}>
        <p>Language </p>
        <button onClick={changeLanguage} className={language.toUpperCase() == 'EN' ? styles.buttonOn : ''}>
          ENGLISH
        </button>
        <button onClick={changeLanguage} className={language.toUpperCase() == 'IT' ? styles.buttonOn : ''}>
          ITALIAN
        </button>
      </div>

      {started ? null : (
        <>
          <div className={styles.code}>
            <p>Do you have any code?</p>
            <input
              type="text"
              className={styles.inputCode}
              onChange={(value) => (checkRegexp(value.target.value) ? setError(false) : setError(true))}
              ref={inputRef}
              placeholder={'X-XXXX'}
              pattern={regexp}
            />
          </div>
          {error ? <p className={styles.error}>Invalid code</p> : null}
          <div className={styles.checkBattery}>
            <p>Show battery status?</p>
            <div
              style={showBattery ? {backgroundColor: 'var(--orange)'} : {}}
              onClick={() => setShowBattery(!showBattery)}
            >
              {showBattery ? <span>&#10003;</span> : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Index
