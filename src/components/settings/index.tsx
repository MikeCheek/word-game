import React from 'react';
import * as styles from './index.module.scss';
import GameSettingsProps from './index.types';

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
  difficulty,
  changeDifficulty,
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
        <span>
          <button onClick={changeLanguage} className={language.toUpperCase() == 'EN' ? styles.buttonOn : ''}>
            ENGLISH
          </button>
          <button onClick={changeLanguage} className={language.toUpperCase() == 'IT' ? styles.buttonOn : ''}>
            ITALIAN
          </button>
        </span>
      </div>
      <div className={styles.language}>
        <p>Game mode: </p>
        <span>
          <button className={difficulty == 0 ? styles.buttonOn : ''} onClick={changeDifficulty}>
            <abbr title="In normal mode you can submit every combination of letters to find the hidden word">
              NORMAL
            </abbr>
          </button>
          <button className={difficulty == 1 ? styles.buttonOn : ''} onClick={changeDifficulty}>
            <abbr title="In hard mode you can only submit words that exists in the dictionary">HARD</abbr>
          </button>
        </span>
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
          <div className={styles.optionsWrap}>
            <p>Show battery status?</p>
            <div
              style={{ backgroundColor: showBattery ? 'var(--orange)' : 'none' }}
              onClick={() => setShowBattery(!showBattery)}
            >
              {showBattery ? <span>&#10003;</span> : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
