import { useEffect, useRef, useState } from 'react'
import useSound from '../Hooks/useSound';
import { FaVolumeMute } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

const pattern = /^[0-9]+$/;

type Inputtype = 'HOUR' | 'MIN' | 'SEC';

const Timer = () => {
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const [timerStatus, setTimerStatus] = useState<boolean>(false);
    const intervalTimeId = useRef<number | null>(null);
    const [playAudio] = useSound('./timer.mp3');
    const [alert, setAlert] = useState(true);

    const reset = () => {
        if (intervalTimeId.current) {
            clearInterval(intervalTimeId.current!);
        }
        if (timerStatus) {
            setTimerStatus(false);
        }
    }

    const getTotalTimeInSeconds = () => (hour * 3600) + (minute * 60) + (second);

    const handleOnChange = (type: Inputtype, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if(!pattern.test(value)) return;
        reset();

        switch (type) {
            case "HOUR":
                return setHour(+value)
            case 'MIN':
                return setMinute(+value)
            case 'SEC':
                return setSecond(+value)
            default:
                return;
        }
    }

    const formatTime = (intervalTime = 1) => {
        const totalTimeInSeconds = getTotalTimeInSeconds();
        const totalDiff = totalTimeInSeconds - intervalTime;

        if (totalDiff < 0) {
            reset();
            setHour(Math.floor(0));
            setMinute(Math.floor(0));
            setSecond(Math.floor(0));
            if(alert){
                playAudio();
            }
            return;
        }

        const hours = Math.floor(totalDiff / 3600);
        const remainingSeconds = totalDiff % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        setHour(Math.floor(hours));
        setMinute(Math.floor(minutes));
        setSecond(Math.floor(seconds));
    }

    const handleReset = () => {
        reset();
        setHour(Math.floor(0));
        setMinute(Math.floor(0));
        setSecond(Math.floor(0))
    }

    const handleChangeTimerStatus = () => {
        if(getTotalTimeInSeconds() === 0){
            return;
        }

        setTimerStatus(prev => !prev);
    }

    useEffect(() => {
        if (timerStatus) {
            intervalTimeId.current = window.setInterval(() => {
                formatTime()
            }, 1000)
        } else if (intervalTimeId.current) {
            clearInterval(intervalTimeId.current)
        }

        return () => {
            if (intervalTimeId.current) {
                clearInterval(intervalTimeId.current)
            }
        }
    }, [hour, minute, second, timerStatus])

    return (
        <div className='timer-container' >
            <div className='sound-icon' onClick={() => setAlert(prev => !prev)} >
               {alert ? <AiFillSound /> : <FaVolumeMute />}
            </div>
            <div className='input-container' >
                <div>
                    {/* <label htmlFor="hour">Hour</label> */}
                    <input id='hour' type="text" value={hour.toString().padStart(2, '0')} onChange={(event) => handleOnChange('HOUR', event)} />
                </div>
                :
                <div>
                    {/* <label htmlFor='minute' >Minute</label> */}
                    <input id='minute' type="text" value={minute.toString().padStart(2, '0')} onChange={(event) => handleOnChange('MIN', event)} />
                </div>
                :
                <div>
                    {/* <label htmlFor="second">Second</label> */}
                    <input id='second' type="text" value={second.toString().padStart(2, '0')} onChange={(event) => handleOnChange('SEC', event)} />
                </div>
            </div>

            <div className='action-btns' >
                <button onClick={handleChangeTimerStatus} >
                    {
                        !timerStatus ?
                            <svg width="8020px0px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Media / Play">
                                    <path id="Vector" d="M5 17.3336V6.66698C5 5.78742 5 5.34715 5.18509 5.08691C5.34664 4.85977 5.59564 4.71064 5.87207 4.67499C6.18868 4.63415 6.57701 4.84126 7.35254 5.25487L17.3525 10.5882L17.3562 10.5898C18.2132 11.0469 18.642 11.2756 18.7826 11.5803C18.9053 11.8462 18.9053 12.1531 18.7826 12.4189C18.6418 12.7241 18.212 12.9537 17.3525 13.4121L7.35254 18.7454C6.57645 19.1593 6.1888 19.3657 5.87207 19.3248C5.59564 19.2891 5.34664 19.1401 5.18509 18.9129C5 18.6527 5 18.2132 5 17.3336Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg> :
                            <svg width="22px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7V17C7 17.5523 7.44772 18 8 18C8.55228 18 9 17.5523 9 17V7ZM17 7C17 6.44772 16.5523 6 16 6C15.4477 6 15 6.44772 15 7V17C15 17.5523 15.4477 18 16 18C16.5523 18 17 17.5523 17 17V7Z" fill="#ffffff" />
                            </svg>
                    }
                </button>
                <button onClick={handleReset} >
                    <svg fill="#ffffff" width="16px" height="16px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fillRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Timer