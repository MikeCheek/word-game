import React from 'react';
import { CodeLinkProps } from './index.types';
import * as styles from './index.module.scss';
import sleep from '../../utilities/sleep';

const Index = ({ code }: CodeLinkProps) => {
  const handleCopyClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, text: string) => {
    const target = event.currentTarget;
    const nav = window.navigator || navigator;
    nav.clipboard.writeText(text);
    target.innerHTML = 'Copied!';
    sleep(3000).then(() => (target.innerHTML = '(Copy)'));
  };

  const link = `${location.origin + location.pathname.split('/code')[0]}/code/${code}`;

  return (
    <span>
      <p>
        Code of the word: {code}{' '}
        <span className={styles.copy} onClick={(e) => handleCopyClick(e, code)}>
          (Copy)
        </span>
      </p>
      <span>
        If you want to play again with this word save{' '}
        <a className="link" href={link} rel="noopener noreferrer">
          this link
        </a>
        <span className={styles.copy} onClick={(e) => handleCopyClick(e, link)}>
          (Copy)
        </span>
      </span>
    </span>
  );
};

export default Index;
