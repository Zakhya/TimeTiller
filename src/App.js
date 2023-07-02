import './App.css';
import {React, useState, useEffect } from 'react';
import Header from './components/Header';
import fillGrid from './components/populateBoxes';
import Box from './components/Box'

function App() {
  const [grid, setGrid] = useState(fillGrid)  
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(true)


  

  const squareElemnets = grid.map(cell =>(
    <Box 
    rowId={cell.rowId}
    id={cell.id}
    key={cell.id}
    columnId={cell.columnId}
    color={cell.color}
    beingGrown={cell.beingGrown}
    isGrowing={cell.isGrowing}
    setIsTimerRunning={setIsTimerRunning}
    isTimerRunning={isTimerRunning}
    isFinished={isFinished}
    setIsFinished={setIsFinished}
    grid={grid}
    setGrid={setGrid}
    timerIsRunning={cell.timerIsRunning}
    longTermItem={cell.longTermItem}
    />
  ))
  return (
    <div className="App">
      <Header />
      <div className="grid">
        {squareElemnets}
      </div>
    </div>
  );
}

export default App;
