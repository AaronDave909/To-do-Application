import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    return (
        <div className="clock">
            <div>{formatDate(dateTime)}</div>
            <div>{formatTime(dateTime)}</div>
        </div>
    );
};

export default Clock;
