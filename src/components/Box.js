import { React, useState, useEffect } from 'react'
import { GiCuauhtli, GiHouse } from 'react-icons/gi';
import { LuSprout } from 'react-icons/lu';
export default function Box(props){
    const [status, setStatus] = useState('empty')
    const [finishedItem, setFinishedItem] = useState(localStorage.getItem(`finishedItem${props.id}`) || 'none')
    const [endGoalDate, setEndGoalDate] = useState(localStorage.getItem(`endGoalDate${props.id}`) || '')
    const [isGrowing, setIsGrowing] = useState(false) 
    const [beingGrown, setBeingGrown] = useState('none')
    const [longTermItem, setLongTermItem] = useState('none')
    const [isUpgrading, setIsUpgrading] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

    

    const [timer, setTimer] = useState(0)
    const [saveTime, setSaveTime] = useState(localStorage.getItem(`saveTime${props.id}` || 0))
    const [nextTimeReward, setNextTimeReward] = useState(5)
  
    const [isFinishedLongTerm, setIsFinishedLongTerm] = useState('')
    const currentDate = new Date().getTime()
    let upgrade = false
    let timerColor = 'red'
    if(props.timer > 300){
        timerColor = 'blue'
        upgrade = true
    }
    const timerColorStyle = {
        color: timerColor
    }

    if(endGoalDate < currentDate){

    }

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };

      if(timer >0){
          console.log(`timer: ${timer}`)
          console.log(`reward: ${nextTimeReward}`)

      }
      
      useEffect(() => {
        console.log('beingGrown:', beingGrown);
      
        
      }, [isUpgrading]);

  const handleFirstClick = () => {
    if (props.isFinished  && !isGrowing && beingGrown === 'none') {
        setBeingGrown('sprout')
        setIsGrowing(true)
        setIsTimerRunning(true)
        props.setIsFinished(false)
    }
    
  };


      
  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
            console.log(prevTimer)
          if (prevTimer + 1 > nextTimeReward) {
            if (beingGrown === 'sprout') {
                console.log('upgrade to two-sprout');
                setBeingGrown('two-sprout');
                setLongTermItem('sprout');
              } else if (beingGrown === 'two-sprout') {
                console.log('upgrade to four-sprout');
                setBeingGrown('four-sprout');
                setLongTermItem('two-sprout');
              } else if (beingGrown === 'four-sprout') {
                console.log('upgrade to house');
                setBeingGrown('house');
                setLongTermItem('four-sprout');
              } else if (beingGrown === 'house') {
                console.log('upgrade to four-house');
                setBeingGrown('four-house');
                setLongTermItem('house');
              }
              setNextTimeReward(prev => prev + 5)
            console.log("upgradeRan")
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else {
      console.log('Timer stopped:', timer);
      if(timer > 0){
          localStorage.setItem(`saveTime${props.id}`, timer)
          setSaveTime(timer)
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [[timer, beingGrown, nextTimeReward]]);


  const pauseTimer = () => {
    setIsGrowing(false)
    setIsTimerRunning(false)
  }

  const resumeTimer = () => {
    setIsGrowing(true)
    setIsTimerRunning(true)
  }


     // console.log(status)
    //  console.log(props.beingGrown)
     // console.log(`currentDate: ${currentDate}`)
    //  console.log(`endGoalDate: ${endGoalDate}`)
   //   console.log(`timeLeft: ${endGoalDate - currentDate}`)
      

    return (
    <div>{finishedItem === 'none' ? 
        (<div
            className="box"
            onClick={(e) => {
                if(beingGrown === 'none' && props.isFinished){
                    handleFirstClick()
                    setStatus('growing')
                } else if(status ==='growing'){
                    console.log('pause click')
                    setStatus('paused')
                    pauseTimer()
                }
            }}
            >
            {status === 'paused'? (
                <div className='pauseContainer'>
                <div className="cell--timer" style={timerColorStyle} >{`${formatTime(timer)}`}</div>
                <button className='continue--button' 
                onClick={() => {
                        setStatus('growing')
                        resumeTimer()
                    }}>Continue</button>
                    <button className='finished--button'
                    onClick={() => {
                        props.setIsFinished(true)
                        setStatus('finished')
                        setFinishedItem(longTermItem)
                        
                        const currentDateTime = new Date();
                        const newEndGoalDate = currentDateTime.getTime() + 4 * 60 * 60 * 1000;
                        setEndGoalDate(newEndGoalDate);
                        localStorage.setItem(`endGoalDate${props.id}`, newEndGoalDate);
                        localStorage.setItem(`finishedItem${props.id}`, longTermItem);
                    }}>Finished</button>
                    </div>) : beingGrown === 'sprout' && finishedItem === 'none' ? (
                        <div className='icon--container'>
                        <div style={timerColorStyle} >{`${formatTime(timer)}`}</div>
                        <LuSprout className='single--sprout--icon'/>
                        </div>) : beingGrown === 'two-sprout' && finishedItem === 'none' ? (
                            <div className='two--icon--container'>
                            <div style={timerColorStyle} >{`${formatTime(timer)}`}</div>
                    <LuSprout className='sprout--icon two--icon--item'/>
                    <LuSprout className='sprout--icon two--icon--item margin-bottom'/>
                    </div>):  beingGrown === 'four-sprout'  && finishedItem === 'none' ? (
                        <div className='four--icon--container'>
                        <div className="cell--timer" style={timerColorStyle} >{`${formatTime(timer)}`}</div>
                        <LuSprout className='sprout--icon four--icon--item margin-left'/>
                        <LuSprout className='sprout--icon four--icon--item'/>
                        <LuSprout className='sprout--icon four--icon--item margin-left'/>
                        <LuSprout className='sprout--icon four--icon--item'/>
                        </div>) : null}
                        </div>) : 
                        
                        (<div
                            className="box"
                            onClick={(e) => {
                                console.log('open grow menu')

                                setStatus('growMenu') 
                                /*
                                setFinishedItem('none')
                                props.resumeTimer()
                                */
                            }}
                            >
                            {status === 'growMenu'? (
                                <div className='pauseContainer'>
                                <div className="cell--timer" style={timerColorStyle} >{`${formatTime(timer)}`}</div>
                                <button className='continue--button' 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setStatus('growing')
                                    setFinishedItem('none')
                                    props.resumeTimer()
                                    console.log("resume click")
                                    props.setIsFinished(false)
                                }}>Resume</button>
                                <button className='finished--button'
                                    onClick={() => {
                                    setStatus('finished')
                                    setFinishedItem(longTermItem)
                                }}>close</button>
        </div>) : finishedItem === 'sprout'? (
            <div className='finished--icon--container'>
                <LuSprout className='finished--single--sprout--icon'/>
            </div>) : finishedItem === 'two-sprout'? (
                <div className='finished--two--icon--container'>
                    <LuSprout className='sprout--icon two--icon--item'/>
                    <LuSprout className='sprout--icon two--icon--item'/>
                </div>): finishedItem === 'four-sprout'? (
                    <div className='finished--four--icon--container'>
                    <LuSprout className='sprout--icon four--icon--item margin-left'/>
                    <LuSprout className='sprout--icon four--icon--item'/>
                    <LuSprout className='sprout--icon four--icon--item margin-left'/>
                    <LuSprout className='sprout--icon four--icon--item'/>
                </div>) : null}
        </div>)}
    </div>
        )
    }