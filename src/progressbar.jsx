import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ completedTasks, totalTasks }) => {
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            <span className="progress-bar-text">{`${Math.round(percentage)}%`}</span>
        </div>
    );
};

export default ProgressBar;
