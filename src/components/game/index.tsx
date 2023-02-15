import React, { useEffect, useRef, useState } from 'react';

import * as styles from './index.module.scss';
import { WordGameProps } from './index.types';

import containsChar from '../../utilities/containsChar';
import sleep from '../../utilities/sleep';
import { existsWord, getDefinition } from '../../utilities/word';
import { strToHash } from '../../utilities/hash';
import CodeLink from '../../atoms/codeLink';
import Victory from '../../atoms/victory';

const alphabet: string[] = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const splitChar = ';';

const Index = ({ word, language, difficulty }: WordGameProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [chars, setChars] = useState<string[]>([]);
  const [remChars, setRemChars] = useState<string[]>([]);
  const [victory, setVictory] = useState<boolean>(false);

  const [inLetters, setInLetters] = useState<string>('');
  const [okLetters, setOkLetters] = useState<string>('');
  const [remainings, setRemainings] = useState<string[]>(alphabet);

  const [attempts, setAttempts] = useState<number>(0);

  const [lan, setLan] = useState<string>(language);

  const [hint, setHint] = useState<string>();
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [disableHint, setDisableHint] = useState<boolean>(false);

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>();
  const [def, setDef] = useState<string>(getDefinition(word));

  const splittedDefinition = lan == 'en' && def ? def.replace(new RegExp(word, 'g'), '****').split(splitChar) : '';

  const getNextHint = () => {
    if (disableHint && !def) return;

    setDisableHint(true);

    if (!hint) {
      setHint(splittedDefinition[hintIndex]);
    } else {
      setHint((h) => h + splitChar + splittedDefinition[hintIndex]);
    }

    setHintIndex((h) => h + 1);

    setTimeout(() => {
      setDisableHint(false);
    }, 10000);
  };

  useEffect(() => {
    setLan(language);
    setCode(strToHash(word, lan));
    setChars(Array.from(word));
    setRemChars(Array.from(word));
    console.log(`
Oh you've arrived here...
What are you looking for? 
What do you expect to find here?
I'm having fun with ${word}... 
Go somewhere else or try to guess the word `);
  }, [word]);

  const nextInput = (index: number): void => {
    const nextElement = formRef.current!.elements[index + 1] as HTMLInputElement;
    if (nextElement) {
      if (nextElement.value == 'Check') return;
      if (nextElement.disabled) nextInput(index + 1);
      else {
        nextElement.focus();
        nextElement.select();
      }
    }
  };

  const previousInput = (index: number): void => {
    const prevElement = formRef.current!.elements[index - 1] as HTMLInputElement;
    if (prevElement)
      if (prevElement.disabled) previousInput(index - 1);
      else {
        prevElement.focus();
        prevElement.select();
      }
  };

  const handleEnter = (event: any): void => {
    const form = formRef.current || event.target.form;
    const index = [...form].indexOf(event.target);

    if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'arrowright') {
      //if form is full
      if (form.elements[index + 1].value == 'Check' || form.elements[index + 1].disabled) {
        check(event);
      }
      nextInput(index);
      event.preventDefault();
    } else if (event.key.toLowerCase() === 'arrowleft') {
      previousInput(index);
      event.preventDefault();
    } else if (event.key.toLowerCase() === 'backspace' && event.target.value === '') {
      previousInput(index);
    }
  };

  const handleChange = (event: any) => {
    const form = formRef.current || event.target.form;
    const index = [...form].indexOf(event.target);
    setError(undefined);

    if (event.target.value == ' ' || event.target.value == '' || !event.target.value.match('^([a-z]|[A-Z])*$')) {
      event.target.value = '';
    } else {
      nextInput(index);
      event.preventDefault();
    }
  };

  const check = (event: any) => {
    const form = formRef.current || event.target.form;
    const tmpArray: string[] = [];
    let tmpString = '';

    let tmpIn = inLetters;
    let tmpOk = okLetters;
    let tmpRem = remainings;

    for (let i = 0; i < word.length; i++) {
      tmpArray.push(form.elements[i].value);
      tmpString += form.elements[i].value;
    }

    if (tmpArray.length != tmpString.length) {
      setError('FILL IN ALL THE SPACES');
      return;
    }

    if (difficulty == 1 && !existsWord(tmpString, language)) {
      setError("THE WORD YOU TYPED DOESN'T EXIST");
      return;
    }

    setAttempts(attempts * 1 + 1);

    for (let i = 0; i < tmpArray.length; i++) {
      tmpRem = tmpRem.filter((value, _index, _arr) => {
        return value.toUpperCase() != tmpArray[i].toUpperCase();
      });
      if (!containsChar(tmpIn, tmpArray[i])) tmpIn += tmpArray[i];

      if (containsChar(remChars.toString(), tmpArray[i]) && tmpArray[i] != '') {
        document.getElementById('input' + i)!.style.backgroundColor = 'var(--orange)';
        if (!containsChar(tmpOk, tmpArray[i])) tmpOk += tmpArray[i];
      } else {
        document.getElementById('input' + i)!.style.backgroundColor = '';
      }

      if (tmpArray[i].toUpperCase() === chars[i].toUpperCase()) {
        document.getElementById('input' + i)!.style.backgroundColor = 'var(--pink)';
        document.getElementById('input' + i)!.setAttribute('disabled', 'disabled');

        let tmpRemChars = remChars;
        tmpRemChars[i] = '_';
        setRemChars(tmpRemChars);
      }
    }

    if (word.toUpperCase() === tmpString.toUpperCase()) setVictory(true);
    else
      document
        .getElementById('trebbling')!
        .animate(
          [
            { transform: 'none' },
            { transform: 'translateX(10px) rotateZ(1deg)' },
            { transform: 'translateX(-10px) rotateZ(1deg)' },
            { transform: 'translateX(10px) rotateZ(-1deg)' },
            { transform: 'translateX(-10px) rotateZ(-1deg)' },
            { transform: 'none' },
          ],
          {
            duration: 300,
            easing: 'linear',
          }
        );

    setInLetters(tmpIn);
    setOkLetters(tmpOk);
    setRemainings(tmpRem);
  };

  return (
    <div id={'form'} className={styles.form}>
      <form ref={formRef} id={'form'}>
        <div id={'trebbling'}>
          {chars.map((_char, key) => {
            return (
              <input
                type={'text'}
                key={key}
                className={styles.input}
                id={'input' + key}
                name={'input' + key}
                tabIndex={key + 1}
                enterKeyHint={'next'}
                maxLength={1}
                onKeyDown={handleEnter}
                onChange={handleChange}
                pattern={'^([a-z]|[A-Z])*$'}
                autoFocus={key === 0}
                onClick={(e) => e.currentTarget.select()}
              />
            );
          })}
        </div>
        {error ? <p>{error}</p> : null}
        {victory ? (
          <Victory word={word} attempts={attempts} lan={lan} def={def} />
        ) : (
          <>
            <button className={styles.check} type={'button'} value={'Check'} onClick={check}>
              CHECK
            </button>
            <p>Attempts: {attempts}</p>
          </>
        )}
      </form>

      <CodeLink code={code} />

      <div className={styles.lettersWrapper}>
        <div className={styles.lettersL}>
          <div className={styles.letters}>
            <p>Letters of the word</p>
            <div className={styles.charListOrange}>
              {Array.from(okLetters).map((letter, key) => {
                return <p key={key}>{letter.toUpperCase()}</p>;
              })}
            </div>
          </div>
          {lan == 'en' ? (
            <span>
              {hintIndex < splittedDefinition.length && lan === 'en' && (
                <button type="button" className={styles.buttonHint} onClick={getNextHint} disabled={disableHint}>
                  {disableHint ? `WAIT 10 SECONDS FOR NEXT` : 'SHOW'} HINT
                </button>
              )}
              {hint && <p className={styles.box}>{hint}</p>}
              {hint?.includes('****') && <p>The hidden word is replaced with ****</p>}
            </span>
          ) : null}
        </div>
        <div className={styles.lettersR}>
          <div className={styles.letters}>
            <p>Letters used</p>
            <div className={styles.charList}>
              {Array.from(inLetters).map((letter, key) => {
                return <p key={key}>{letter.toUpperCase()}</p>;
              })}
            </div>
          </div>
          <div className={styles.letters}>
            <p>Remaining letters</p>
            <div className={styles.charList}>
              {remainings.map((letter, key) => {
                return <p key={key}>{letter.toUpperCase()}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
