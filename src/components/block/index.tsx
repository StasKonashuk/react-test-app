import React from 'react';

interface BlockProps {
  blockRef: React.MutableRefObject<HTMLDivElement | null>;
  className: string;
  name: string;
}

function Block({ blockRef, className, name }: BlockProps) {
  return (
    <div className={className} ref={blockRef}>
      <p>{name}</p>
    </div>
  );
}

export default Block;
