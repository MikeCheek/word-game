import React, { useState } from 'react';
import { getDefinition } from '../../utilities/word';
import * as styles from './index.module.scss';
import { VictoryProps } from './index.types';

const Index = ({ word, attempts, lan, def }: VictoryProps) => {
  const [definition, setDefinition] = useState<boolean>(false);

  const toggleDefinition = () => setDefinition(!definition);

  return (
    <div className={styles.victory}>
      <h2>
        YOU HAVE GUESSED THE WORD <span style={{ color: 'var(--pink)' }}>{word.toUpperCase()}</span> IN {attempts}{' '}
        {attempts == 1 ? 'ATTEMPT' : 'ATTEMPTS'}!!
      </h2>
      {lan === 'en' && def ? (
        <>
          <button type={'button'} className={styles.ctaDefinition} onClick={toggleDefinition}>
            {definition ? `HIDE` : `SHOW`} DEFINITION
          </button>
          {definition ? (
            <p className={styles.box}>
              <span style={{ color: 'var(--pink)' }}>{word}</span>: {def}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Index;
