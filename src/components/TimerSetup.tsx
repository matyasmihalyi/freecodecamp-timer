import { PeriodTypes } from '../App';
import {ONE_SECOND, ONE_MINUTE} from '../hooks/TimeSetHook'

type TimerSetupData = {
  sessionTime:number,
  breakTime:number,
  incrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  decrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  timerIsRunning:boolean,
}

type TimerSetupProps = {
  data: TimerSetupData,
  type: PeriodTypes
}


export const TimerSetup = (props:TimerSetupProps) => {

  const {sessionTime, breakTime, incrementTimeSet, decrementTimeSet, timerIsRunning } = props.data;
  const type = props.type;

  const timeSet = ():number => {
    switch (type) {
      case "session":
        return sessionTime;
      case "break":
        return breakTime;
    };
  };

  const formattedTime = ():number => {
    switch (type) {
      case "session":
        return sessionTime / ONE_MINUTE;
      case "break":
        return breakTime / ONE_MINUTE;
    };
  };
  
  type IdTypes = "increment"|"decrement"|"label"|"length";

  type ElementIds = {
    [propNames in IdTypes]: string;
  };

  const ids:ElementIds = {
    increment: `${type}-increment`,
    decrement: `${type}-decrement`,
    label: `${type}-label`,
    length: `${type}-length`
  };
  
  
  return (
    <div className="setup-wrapper">
      <h2 id={ids.label}>{type} Length</h2>
      <span id={ids.length}>{formattedTime()}</span>
      <button id={ids.increment} onClick={()=> incrementTimeSet(timeSet(), type)} type="button">increment</button>
      <button id={ids.decrement} onClick={()=> decrementTimeSet(timeSet(), type)} type="button">decrement</button>
    </div>
  );
}