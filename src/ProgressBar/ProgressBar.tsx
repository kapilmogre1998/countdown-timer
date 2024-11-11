import React from "react";

interface ProgressBarProps {
    progressbarclr?: string;
    degvalue?: number;
    timer?: string;
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>
}

const ProgressBar:React.FC<ProgressBarProps>  = ({ progressbarclr = 'yellow', degvalue = 20, timer = '00', onInputChange = () => {}, onBlur = () => {} }) => {    

    return (
        <div className='progress-bar-container' style={{ background: `conic-gradient(${progressbarclr} ${degvalue}deg, white 0deg)` }} >
            <input className="input-time" id='hour' type="text" maxLength={2} value={timer ? timer : ''} onChange={onInputChange} placeholder="00" onBlur={onBlur} />
        </div>
    )
}

export default ProgressBar