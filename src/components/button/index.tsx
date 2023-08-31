import React from 'react';

interface ButtonProps {
  isDisabled: boolean;
  onClickHandler: () => void;
  className: string;
  value: string;
  btnContainerClassName: string;
}

function Button({
  isDisabled,
  onClickHandler,
  className,
  value,
  btnContainerClassName,
}: ButtonProps) {
  return (
    <div className={btnContainerClassName}>
      <button disabled={isDisabled} type="button" onClick={onClickHandler} className={className}>
        {value}
      </button>
    </div>
  );
}

export default Button;
