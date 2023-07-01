import './App.css';
import {React, useState, useEffect } from 'react';
import Header from './components/Header';
import fillGrid from './components/populateBoxes';
import Box from './components/Box'

function App() {
  const [grid, setGrid] = useState(fillGrid)  
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timer, setTimer] = useState(0)
  const [index, setIndex] = useState(0); // Maintain an index state
  const [isGrowing, setIsGrowing] = useState(false) 
  const [nextTimeReward, setNextTimeReward] = useState(0)

  const [growthList, setGrowthList] = useState([{
    id:1,
    toBeBuilt: 'none'
},{
    id: 2,
    toBeBuilt: 'sprout'
},{
    id:3,
    toBeBuilt: 'two-sprout'
},{
    id:4,
    toBeBuilt: 'four-sprout'
},{
    id: 5,
    toBeBuilt: 'house'
}])



  function upgradeCell(id, beingGrown){
    if(timer < nextTimeReward) return
    setGrid(prev => {
      return prev.map(item => {
        if(item.id === id){
          console.log(id)
          if(beingGrown === 'none') {
            console.log('sprout')
            return {...item, beingGrown: 'sprout'}
          } else if(beingGrown === 'sprout'){
            return {...item, beingGrown: 'two-sprout', longTermItem: 'sprout'}
          } else if(beingGrown === 'two-sprout'){
            return {...item, beingGrown: 'four-sprout', longTermItem: 'two-sprout'}
          } else if(beingGrown === 'four-sprout'){
            return {...item, beingGrown: 'house', longTermItem: 'four-sprout'}
          } else if(beingGrown === 'house'){
            return {...item, beingGrown: 'village', longTermItem: 'house'}
          }
        } else {
          return item
        }
      })
  }
  )}


  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer + 1 > nextTimeReward) {
            const cell = grid.find((item) => item.isGrowing === true);
            if (cell) {
              upgradeCell(cell.id, cell.beingGrown);
              setNextTimeReward(prev => prev + 2)
            }
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else {
      console.log('Timer stopped:', timer);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, grid, timer]);


  const handleFirstClick = (id) => {
    if (!isTimerRunning  && !isGrowing) {
      setGrid((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, beingGrown: 'sprout', isGrowing: true };
          }
          return item;
        });
      });
      if(nextTimeReward === 0)setNextTimeReward(5)
      setIsGrowing(true)
    }
    setIsTimerRunning(prev => !prev);
  };

  const pauseTimer = (id) => {
    setGrid((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.isGrowing === true) {
          setIsTimerRunning(false);
          return { ...item, isGrowing: false };
        }
        return item;
      });
    });
  }

  const resumeTimer = (id) => {
    setGrid((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.isGrowing === false) {
          return { ...item, isGrowing: true };
        }
        return item;
      });
    });
    setIsTimerRunning(true);
  }

  const squareElemnets = grid.map(cell =>(
    <Box 
    rowId={cell.rowId}
    id={cell.id}
    key={cell.id}
    columnId={cell.columnId}
    color={cell.color}
    beingGrown={cell.beingGrown}
    timer={timer}
    setTimer={setTimer}
    isGrowing={cell.isGrowing}
    pauseTimer={() => pauseTimer(cell.id)}
    resumeTimer={() => resumeTimer(cell.id)}
    longTermItem={cell.longTermItem}
    isTimerRunning={isTimerRunning}
    setIsTimerRunning={setIsTimerRunning}
    upgradeCell={() => upgradeCell(cell.id, cell.beingGrown)}
    handleFirstClick={(e) => handleFirstClick(cell.id)}
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
