import React from "react";
import {minutesToDuration, secondsToDuration}from "../utils/duration"

function ActiveSessionDisplay({activeSession, inFocus, focusTime, breakTime, timerMins, timerSecs, progressBar, isTimerRunning}) {
    let seconds = (timerMins * 60) + timerSecs;

    return (
        <div style={activeSession ? { display: "block" } : { display: "none" }}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
                {inFocus ? `Focusing for ${minutesToDuration(focusTime)} minutes` : `On Break for ${minutesToDuration(breakTime)} minutes`}
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(seconds)} remaining
            </p>
            <h3 style={{color: "red"}}>
                {!isTimerRunning ? "PAUSED" : null}
            </h3>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBar} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressBar}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ActiveSessionDisplay