import React from "react";
import { minutesToDuration } from "../utils/duration";

function Break({breakTime, decreaseBreakTime, increaseBreaktime}) {

    return (
        <div className="col">
            <div className="float-right">
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" data-testid="duration-break">
                        {/* TODO: Update this text to display the current break session duration */}
                        Break Duration: {minutesToDuration(breakTime)}
                    </span>
                    <div className="input-group-append">
                        {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-break"
                            onClick={decreaseBreakTime}
                        >
                            <span className="oi oi-minus" />
                        </button>
                        {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-break"
                            onClick={increaseBreaktime}
                        >
                            <span className="oi oi-plus" />
                        </button>
                    </div>
                </div>
             </div>
         </div>
    )
}

export default Break;