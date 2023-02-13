import React, { useEffect, useState, useRef } from 'react';

import * as styles from './index.module.scss';
import GameHeroProps from './index.types';

import Game from '../game';
import Loading from '../../atoms/loading';
import randomWord from '../../utilities/word';
import { hashToStr } from '../../utilities/hash';
import Rules from '../../atoms/rules';
import Battery from '../../atoms/battery';
import Settings from '../settings';
import SettingsSVG from '../../assets/settings.svg';

const Index = ({ code }: GameHeroProps): JSX.Element => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');
  const [started, setStarted] = useState<boolean>(false);
  const [length, setLength] = useState<number>(7);
  const [time, setTime] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [showBattery, setShowBattery] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const [language, setLanguage] = useState<string>('en');

  const regexp = '^(e|E|i|I)(-)([a-zA-Z]{2,})';

  const changeDifficulty = () => {
    setDifficulty((diff) => (diff + 1) % 2);
  };

  const checkRegexp = (str: string) => {
    return new RegExp(regexp).test(str);
  };

  const forceRemount = () => {
    setKey((k) => (k === 0 ? 1 : 0));
  };

  const fetchData = async () => {
    setFetched(false);
    setStarted(true);
    const stime = performance.now();
    const data = randomWord(length, language);
    const etime = performance.now();
    setTime(etime - stime);
    setWord(data);
    setFetched(true);
    setSettings(false);
    forceRemount();
  };

  const increase = () => setLength(length * 1 + 1);
  const decrease = () => {
    if (length >= 4) setLength(length * 1 - 1);
  };

  const changeLanguage = () => {
    if (language === 'en') setLanguage('it');
    else setLanguage('en');
  };

  const useCode = (code: string) => {
    const str = hashToStr(code);
    setWord(str[0].toLowerCase());
    setLanguage(str[1].toLowerCase() == 'i' ? 'it' : 'en');
    setStarted(true);
    setFetched(true);
  };

  const handleStartClick = () => {
    const input = inputRef.current;
    if (input && input.value != '' && input.value.length != 0 && input.value != null) {
      if (input && checkRegexp(input.value)) {
        useCode(input.value);
      }
    } else fetchData();
  };

  useEffect(() => {
    if (code) {
      useCode(code);
    }
  }, [code]);

  return (
    <div className={styles.game}>
      {time > 0 ? (
        <p className={styles.stats}>
          <span>Fetched in:</span>
          <span>{time.toPrecision(5)} ms</span>
        </p>
      ) : null}
      {showBattery ? (
        <div className={styles.battery}>
          <Battery />
        </div>
      ) : null}

      {started ? null : <Rules />}
      <div
        className={styles.settingsWrap}
        onClick={() => {
          setSettings((value) => !value);
        }}
      >
        <SettingsSVG width={50} fill="var(--orange)" />
        <p>Settings</p>
      </div>
      {settings && (
        <Settings
          increase={increase}
          decrease={decrease}
          changeLanguage={changeLanguage}
          language={language}
          setShowBattery={setShowBattery}
          error={error}
          setError={setError}
          inputRef={inputRef}
          showBattery={showBattery}
          started={started}
          handleStartClick={handleStartClick}
          checkRegexp={checkRegexp}
          regexp={regexp}
          length={length}
          difficulty={difficulty}
          changeDifficulty={changeDifficulty}
        />
      )}

      {started ? (
        <div className={styles.restart}>
          <p>Guess the word or </p>
          <button onClick={fetchData} className={styles.buttonRestart}>
            RESTART
          </button>
        </div>
      ) : (
        <button onClick={handleStartClick} className={styles.buttonStart}>
          START
        </button>
      )}

      {fetched ? (
        <Game word={word} language={language} key={key} difficulty={difficulty} />
      ) : started ? (
        <Loading />
      ) : null}
    </div>
  );
};

export default Index;
