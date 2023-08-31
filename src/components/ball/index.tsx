import React from 'react';

interface BallProps {
  onAnimationEnd: () => void;
  className: string;
}

function Ball({ onAnimationEnd, className }: BallProps) {
  return <div onAnimationEnd={onAnimationEnd} className={className} />;
}

export default Ball;
