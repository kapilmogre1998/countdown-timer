import React from "react";

interface ProgressBarProps {
    progressbarclr?: string;
    degvalue?: number;
    timer?: number;
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ProgressBar:React.FC<ProgressBarProps>  = ({ progressbarclr = 'yellow', degvalue = 20, timer = '00', onInputChange = () => {} }) => {

    return (
        <div className='progress-bar-container' style={{ background: `conic-gradient(${progressbarclr} ${degvalue}deg, white 0deg)` }} >
            <input className="input-time" id='hour' type="text" value={timer} onChange={onInputChange} />
        </div>
    )
}

export default ProgressBar