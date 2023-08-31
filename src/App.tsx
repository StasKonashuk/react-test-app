import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Button from './components/button';
import Ball from './components/ball';
import Block from './components/block';

const ONE_SECOND_IN_MILISECONDS = 1000;
const ONE_SECOND = 1;
const ZERO_VALUE = 0;
const MAX_SECONDS = 5;
const HALF = 2;
const QUATER = 4;
const BALL_WIDTH = 50;

enum TIMER_MODES {
  OFF = 'OFF',
  ON = 'ON',
}

function App() {
  // eslint-disable-next-line no-undef
  const [timer, setTimer] = useState<string | NodeJS.Timer>('');
  const [timerMode, setTimerMode] = useState(TIMER_MODES.OFF);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [block2Positions, setBlock2Positions] = useState({ x: ZERO_VALUE, y: ZERO_VALUE });
  const [activeBallAnimation, setActiveBallAnimation] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const block1Ref = useRef<HTMLDivElement | null>(null);
  const block2Ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (timerMode === TIMER_MODES.ON) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - ONE_SECOND);
      }, ONE_SECOND_IN_MILISECONDS);
      setTimer(timerId);
    } else {
      clearInterval(timer);
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
    setActiveBallAnimation(true);
  };

  const isStartButtonDisabled = timerMode === TIMER_MODES.ON;

  useEffect(() => {
    const block1Rect = block1Ref?.current?.getBoundingClientRect();
    const block2Rect = block2Ref?.current?.getBoundingClientRect();

    if (block1Rect && block2Rect) {
      document.documentElement.style.setProperty(
        '--bal-top-position',
        `${block1Rect.top + block1Rect.height / QUATER}px`,
      );

      document.documentElement.style.setProperty(
        '--bal-left-position',
        `${block1Rect.left + block1Rect.width / QUATER}px`,
      );

      setBlock2Positions({ x: block2Rect.x, y: block2Rect.y });

      document.documentElement.style.setProperty(
        '--ball-end-x-position',
        `${block2Positions.x + BALL_WIDTH / HALF}px`,
      );

      document.documentElement.style.setProperty(
        '--ball-end-y-position',
        `${block2Positions.y + BALL_WIDTH / HALF}px`,
      );
    }
  }, [timerMode, windowWidth, windowHeight]);

  const onBallAnimationEndHandler = () => {
    setActiveBallAnimation(false);
  };

  return (
    <div className="container">
      <div className="sections-container">
        <Block name="1" blockRef={block1Ref} className="block1" />
        <Block name="2" blockRef={block2Ref} className="block2" />
      </div>
      <Button
        isDisabled={isStartButtonDisabled}
        onClickHandler={onClickHandler}
        className="start-button"
        value={!isStartButtonDisabled ? 'start' : `${seconds}`}
        btnContainerClassName="button-container"
      />
      {activeBallAnimation && <Ball onAnimationEnd={onBallAnimationEndHandler} className="ball" />}
    </div>
  );
}

export default App;
