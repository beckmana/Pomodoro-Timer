import React, { useState } from "react";
//import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
//import {minutesToDuration, secondsToDuration }from "../utils/duration"
import Focus from "./Focus";
import Break from "./Break";
import PlayPauseStop from "./PlayPauseStop";
import ActiveSessionDisplay from "./ActiveSessionDisplay";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  //Focus and Break states
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [initFocusTime, setInitFocusTime] = useState(25);
  const [initBreakTime, setInitBreakTime] = useState(5);
  const [inFocus, setInFocus] = useState(true);
  const [inBreak, setInBreak] = useState(false);
  
  //Session states
  const [initSession, setInitSession] = useState(true);
  const [activeSession, setActiveSession] = useState(false);
  //const [pausedSession, setPausedSession] = useState(false);

  //Timer countdown States
  const [timerMins, setTimerMins] = useState(25);
  const [timerSecs, setTimerSecs] = useState(0);
    //Progress bar
  const [progressBar, setProgressBar] = useState(0);

  //Focus/Break increase and decrease button handlers
  const handleDecreaseFocus = () => {
    if (focusTime > 1 && !isTimerRunning && initSession) {
      setFocusTime(mins => mins -= 1);
    }
  }
  const handleIncreaseFocus = () => {
    if (focusTime < 60 && !isTimerRunning && initSession) {
      setFocusTime(mins => mins += 5);
    }
  }
  const handleDecreaseBreak = () => {
    if (breakTime > 1 && !isTimerRunning && initSession) {
      setBreakTime(mins => mins -= 1);
    }
  }
  const handleIncreaseBreak = () => {
    if (breakTime < 15 && !isTimerRunning && initSession) {
      setBreakTime(mins => mins += 1);
    }
  }

  
  //switch timers 
  const endFocus = () => {
    new Audio(`http://tones.fuzzup.net/mp3/44.mp3`).play();
    setInFocus(state => state = false);
    setInBreak(state => state = true);
    setProgressBar(state => state = 0);
    setTimerMins(mins => mins = initBreakTime);
    setTimerSecs(secs => secs = 0); 
  }
  const endBreak = () => {
    new Audio(`http://tones.fuzzup.net/mp3/44.mp3`).play();
    setInFocus(state => state = true);
    setInBreak(state => state = false);
    setProgressBar(state => state = 0);
    setTimerMins(mins => mins = initFocusTime);
    setTimerSecs(secs => secs = 0); 
  }

  //turns mins into secs to find percent of time passed
  const progressPercent = (mins, secs, initMins) => 100 - (((mins * 60) + secs) / (initMins * 60) * 100);
  


  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setTimerSecs(sec => {
        //subtract 1 second until =0, then reset to 59
        sec === 0 ? sec = 59 : sec -= 1;
        //decrease mins when seconds goes down (hits 59 secs)
        if (sec === 59) {
          setTimerMins(min => min = timerMins - 1);
        }
        return sec;
      })
      
      //Change progress bar percent
      inFocus ? 
        setProgressBar(percent => percent = progressPercent(timerMins, timerSecs, initFocusTime)) :
        setProgressBar(percent => percent = progressPercent(timerMins, timerSecs, initBreakTime))
      
      //when current timmer hits 0, switch timers
      if (timerMins === 0 && timerSecs === 1) {
        inFocus ? endFocus() : endBreak();
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    // Once the Focus and Break times are set initially and user hits play 
    // store the choosen times, start with the focus time, 
    // and start active session with timer started(or paused) 
    if (initSession) {
      setInitFocusTime(mins => mins = focusTime);
      setInitBreakTime(mins => mins = breakTime);
      setTimerMins(mins => mins = focusTime);
      setInitSession(state => state = false);
    }
    setActiveSession(state => state = true);
    setIsTimerRunning((prevState) => !prevState);
  }

  const handleStopSession = () => {
    //when session is stopped, reset back to initial states
    setIsTimerRunning(state => state = false);
    setActiveSession(state => state = false);
    setInitSession(state => state = true);
    setInFocus(state => state = true);
    setInBreak(state => state = false);
    setTimerMins(state => state = focusTime);
    setTimerSecs(state => state = 0);
    setInitFocusTime(state => state = 25);
    setInitBreakTime(state => state = 5);
    setProgressBar(state => state = 0);

  }

  return (
    <div className="pomodoro">
      <div className="row">
        
          <Focus
            focusTime={focusTime}
            decreaseFocusTime={handleDecreaseFocus}
            increaseFocusTime={handleIncreaseFocus}
          />
      
          <Break
            breakTime={breakTime}
            decreaseBreakTime={handleDecreaseBreak}
            increaseBreaktime={handleIncreaseBreak}
          />
          
      </div>

      <div className="row">
        <PlayPauseStop
          isTimerRunning={isTimerRunning}
          playPause={playPause}
          stopSession={handleStopSession}
        />
      </div>

      <ActiveSessionDisplay
        activeSession={activeSession}
        inFocus={inFocus}
        focusTime={focusTime}
        breakTime={breakTime}
        timerMins={timerMins}
        timerSecs={timerSecs}
        progressBar={progressBar}
        isTimerRunning={isTimerRunning}
      />

    </div>
  );
}

export default Pomodoro;
