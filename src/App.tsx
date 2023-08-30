import React from 'react';
import './App.css';

function App() {
  const onClickHandler = () => {
    console.log('click');
  };
  return (
    <div className="container">
      <div className="sections-container">
        <div className="section">Left</div>
        <div className="section">Right</div>
      </div>
      <div className="button-container">
        <button type="button" onClick={onClickHandler} className="start-button">
          START
        </button>
      </div>
    </div>
  );
}

export default App;
