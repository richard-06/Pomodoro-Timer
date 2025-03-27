import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { use } from "react";
import { useRef } from "react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycle, setCycle] = useState(0);

  const timerIdRef = useRef(null);

  // useEffect(() => {

  // }, [temp]);

  function start() {
    if (!isRunning) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setCount((e) => {
          console.log(e);

          if (e <= 0) {
            clearInterval(timerIdRef.current);
            if (mode == "focus") {
              console.log("changing mode");
              setMode("break");
              setIsRunning(false);
              setCycle((e) => e + 1);
              return 300;
            }
            timerIdRef.current = null;
            console.log("stop");
            return e;
          }
          return e - 1;
        });
      }, 1000);
    }
  }

  function pause() {
    if (isRunning) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      setIsRunning(false);
    }
  }

  function skip() {
    if (mode == "focus") {
      setCycle(0);
      setCount(300);
      setMode("break");
      setIsRunning(false);
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    if (mode == "break") {
      setCount(1500);
      setMode("focus");
      setIsRunning(false);
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }

  function timeParser(val) {
    if (val <= 9) return `0${val}`;
    return val;
  }

  function navLink(url) {
    window.location.href = url;
  }

  return (
    <>
      <div className="nav">
        <div className="title">Pomodoro Timer</div>
        <div
          className="nav-buttons"
          onClick={() => {
            navLink("https://github.com/richard-06?tab=repositories");
          }}
        >
          <GithubOutlined />
          {" Github"}
        </div>
        <div
          className="nav-buttons"
          onClick={() => {
            navLink("https://www.linkedin.com/in/roshan-richard-9b4272282/");
          }}
        >
          <LinkedinOutlined />
          {" Linkedn"}
        </div>
        <div
          className="nav-buttons"
          onClick={() => {
            navLink("https://www.instagram.com");
          }}
        >
          <InstagramOutlined />
          {" Instagram"}
        </div>
      </div>
      <div className="app">
        {/* <nav>Rohsn</nav> */}
        <div className="stop-watch">
          {mode} | cycle:{cycle}
          <div className="line"></div>
          <div className="time">
            {timeParser(Math.trunc(count / 60))}:{timeParser(count % 60)}
          </div>
          <button className=" skip" onClick={skip} disabled={!isRunning}>
            <div className="icon">
              <StepForwardOutlined />
            </div>
          </button>
          <div>
            <button className="button" onClick={start} disabled={isRunning}>
              Start
            </button>
            <button className="button" onClick={pause} disabled={!isRunning}>
              Pause
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
