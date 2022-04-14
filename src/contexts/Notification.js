import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [width, setWidth] = useState(100);
  const [intervalID, setintervalID] = useState(null);
  const [exit, setExit] = useState(false);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth > 0) {
          return prevWidth - 0.5;
        }
        clearInterval(id);
        return prevWidth;
      });
    }, 30);
    setintervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  };

  useEffect(() => {
    width === 0 && handleCloseNotification();
    //eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      <div className="flex">
        {props.message && (
          <h5
            className="m-3"
            style={{ color: props.type === "SUCCESS" ? "green" : "black" }}
          >
            {props.type === "SUCCESS" ? "✅" : "⛔"}&nbsp;{props.message}
          </h5>
        )}
        <button className="cancel" onClick={handleCloseNotification}>
          ⓧ
        </button>
      </div>
      <div className="bar" style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
