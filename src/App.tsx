/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const ONE_SECOND_IN_MILISECONDS = 1000;
const ONE_SECOND = 1;
const ZERO_VALUE = 0;
const MAX_SECONDS = 5;

enum TIMER_MODES {
  OFF = 'OFF',
  ON = 'ON',
}

function App() {
  // eslint-disable-next-line no-undef
  const [timer, setTimer] = useState<string | NodeJS.Timer>('');
  const [timerMode, setTimerMode] = useState(TIMER_MODES.OFF);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [block1XPostion, setBlock1XPostion] = useState(ZERO_VALUE);
  const [block1YPostion, setBlock1YPostion] = useState(ZERO_VALUE);
  const [block2XPostion, setBlock2XPostion] = useState(ZERO_VALUE);
  const [block2YPostion, setBlock2YPostion] = useState(ZERO_VALUE);

  const block1Ref = useRef<HTMLDivElement | null>(null);
  const block2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (timerMode === TIMER_MODES.ON) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - ONE_SECOND);
      }, ONE_SECOND_IN_MILISECONDS);
      setTimer(timerId);
    }
  }, [timerMode]);

  useEffect(() => {
    if (seconds === ZERO_VALUE) {
      setSeconds(MAX_SECONDS);
      clearInterval(timer);
      setTimerMode(TIMER_MODES.OFF);
    }
  }, [seconds]);

  const onClickHandler = () => {
    setTimerMode(TIMER_MODES.ON);
  };

  const isStartButtonDisabled = timerMode === TIMER_MODES.ON;

  useEffect(() => {
    const block1Rect = block1Ref?.current?.getBoundingClientRect();
    const block2Rect = block2Ref?.current?.getBoundingClientRect();

    if (block1Rect && block2Rect && timerMode) {
      setBlock1XPostion(block1Rect.x);
      setBlock1YPostion(block1Rect.y);
      setBlock2XPostion(block2Rect.x);
      setBlock2YPostion(block2Rect.y);

      document.documentElement.style.setProperty(
        '--ball-end-x-position',
        `${block2XPostion - block1XPostion}px`,
      );

      let resultYPosition = 0;

      if (block1YPostion > block2YPostion) {
        resultYPosition = block2YPostion - block1YPostion;
      } else {
        resultYPosition = block1YPostion - block2YPostion;
      }

      document.documentElement.style.setProperty('--ball-end-y-position', `${resultYPosition}px`);
    }
  }, [timerMode]);

  return (
    <div className="container">
      <div className="sections-container">
        <div ref={block1Ref} className="block1">
          <p>1</p>
          {isStartButtonDisabled && <div className="ball" />}
        </div>
        <div className="block2" ref={block2Ref}>
          2
        </div>
      </div>
      <div className="button-container">
        <button
          disabled={isStartButtonDisabled}
          type="button"
          onClick={onClickHandler}
          className="start-button">
          {!isStartButtonDisabled ? 'start' : `${seconds}`}
        </button>
      </div>
    </div>
  );
}

export default App;
