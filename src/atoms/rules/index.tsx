import React from 'react'

const Index = () => {
  return (
    <>
      <h3>RULES</h3>
      <h4>
        The game is easy. <br />
        Try to guess the secret word by placing letters in boxes.
        <br />
        <br />
        <li>
          When you guess a letter of the word, the box turns <span style={{color: 'var(--orange)'}}>orange</span>
        </li>
        <li>
          When you guess both the letter and the position in the word, the box turns{' '}
          <span style={{color: 'var(--pink)'}}>pink</span>
        </li>
        <br />
        You can change the MAX length and language of the hidden word and other things in the settings. <br />
        <br />
        That's all! Enjoy the game!
      </h4>
    </>
  )
}

export default Index
