import { React, useState, useEffect } from 'react'
import { GiCuauhtli, GiHouse } from 'react-icons/gi';
import { LuSprout } from 'react-icons/lu';
export default function Box(props){
    const [status, setStatus] = useState('empty')
    const [finishedItem, setFinishedItem] = useState('none')
    const [endGoalDate, setEndGoalDate] = useState(localStorage.getItem('endGoalDate') || '')
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



      console.log(status)
      console.log(props.beingGrown)
      console.log(`currentDate: ${currentDate}`)
      console.log(`endGoalDate: ${endGoalDate}`)
      console.log(`timeLeft: ${endGoalDate - currentDate}`)
      

    return (
    <div>{finishedItem === 'none' ? 
        (<div
            className="box"
            onClick={(e) => {
                console.log('pause click')
                if(props.beingGrown === 'none'){
                    props.handleFirstClick()
                    setStatus('growing')
                } else if(status ==='growing'){
                    setStatus('paused')
                    props.pauseTimer()
                }
            }}
            >
            {status === 'paused'? (
                <div className='pauseContainer'>
                <div className="cell--timer" style={timerColorStyle} >{`${formatTime(props.timer)}`}</div>
                <button className='continue--button' 
                onClick={() => {
                        setStatus('growing')
                        props.resumeTimer()
                    }}>Continue</button>
                    <button className='finished--button'
                    onClick={() => {
                        setStatus('finished')
                        setFinishedItem(props.longTermItem)
                        
                        const currentDateTime = new Date();
                        const newEndGoalDate = currentDateTime.getTime() + 4 * 60 * 60 * 1000;
                        setEndGoalDate(newEndGoalDate);
                        localStorage.setItem('endGoalDate', newEndGoalDate);
                    }}>Finished</button>
                    </div>) : props.beingGrown === 'sprout' && finishedItem === 'none' ? (
                        <div className='icon--container'>
                        <div style={timerColorStyle} >{`${formatTime(props.timer)}`}</div>
                        <LuSprout className='single--sprout--icon'/>
                        </div>) : props.beingGrown === 'two-sprout' && finishedItem === 'none' ? (
                            <div className='two--icon--container'>
                            <div style={timerColorStyle} >{`${formatTime(props.timer)}`}</div>
                    <LuSprout className='sprout--icon two--icon--item'/>
                    <LuSprout className='sprout--icon two--icon--item margin-bottom'/>
                    </div>):  props.beingGrown === 'four-sprout'  && finishedItem === 'none' ? (
                        <div className='four--icon--container'>
                        <div className="cell--timer" style={timerColorStyle} >{`${formatTime(props.timer)}`}</div>
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
                                <div className="cell--timer" style={timerColorStyle} >{`${formatTime(props.timer)}`}</div>
                                <button className='continue--button' 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setStatus('growing')
                                    setFinishedItem('none')
                                    props.resumeTimer()
                                    console.log("resume click")
                                }}>Resume</button>
                                <button className='finished--button'
                                    onClick={() => {
                                    setStatus('finished')
                                    setFinishedItem(props.longTermItem)
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