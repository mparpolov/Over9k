import React, { useState, useEffect } from 'react';

import art from '../../assets/neuromancer.jpg';
import getRandomText from '../../utils/getRandomText';

import { texts } from '../../texts/texts';

import './styles.css';

const Home = () => {
  let key = 0;

  const [paragraph, setParagraph] = useState(texts[0].split(' '));
  const [highlighted, setHighlighted] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [userText, setUserText] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const triggerTimer = () => {
    if ( ! isActive ) setIsActive(true);
  }

  const newParagraph = () => {
    setParagraph(getRandomText());
    // Reset all
    setHighlighted([]);
    setUserText('');
    setIsActive(false);
    setSeconds(0);
  }

  const checkText = value => {
    const words = value.split(' ');
    if ( words[words.length - 1] === paragraph[0] ) {
      highlighted.push(paragraph[0]);
      paragraph.splice(0, 1);

      setParagraph(paragraph);
      setHighlighted(highlighted);
    }
    if ( paragraph.length === 0 ) {
      setIsActive(false); // Stop timer
      window.alert(`Well done! You finished in ${seconds} seconds`);
    } 
  };

  return (
    <div className="container">
      <div className="timer-container">
        <h1>Over 9k typing skills</h1>
        <h1>{seconds} seconds</h1>
        <h1>{paragraph.length} words</h1>
        <button onClick={newParagraph} className="hvr-pulse-grow">Generate New Paragraph</button>
        <button className="inactive">Insane Typing Mode</button>
      </div>
      <div className="text-container">
        <img src={art} alt="Neuromancer" />
        <div className="text-wrapper">
        <p>
          {highlighted.map(word => <span key={key++} className="cyan">{word}</span>)}
          {paragraph.join(' ')}
        </p>
        </div>
      </div>
      <textarea
        value={userText} 
        onChange={event => {
          setUserText(event.target.value);
          checkText(event.target.value);
          triggerTimer();
        }}
      >
      </textarea>
    </div>
  );
}

export default Home;
