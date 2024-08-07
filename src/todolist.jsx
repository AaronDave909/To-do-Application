import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './progressbar.jsx';
import './ProgressBar.css'; 
import useLocalStorage from './useLocalStorage'; 


function ToDoList() {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [completedTasks, setCompletedTasks] = useLocalStorage('completedTasks', []);
    const [newTask, setNewTask] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    function addTask() {
        if (newTask.trim() !== "" && selectedDate) {
            const taskWithTime = { 
                name: newTask, 
                completionDate: selectedDate,
                completedAt: null
            };
            if (editingIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = taskWithTime;
                setTasks(updatedTasks);
                setEditingIndex(null);
            } else {
                setTasks([...tasks, taskWithTime]);
            }
            setNewTask("");
            setSelectedDate(null);
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function completeTask(index) {
        const completedTask = { ...tasks[index], completedAt: new Date() };
        setTasks(tasks.filter((_, i) => i !== index));
        setCompletedTasks([...completedTasks, completedTask]);
    }

    function deleteCompletedTask(index) {
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
        setCompletedTasks(updatedCompletedTasks);
    }

    function deleteAllTasks() {
        setTasks([]);
    }

    function deleteAllCompletedTasks() {
        setCompletedTasks([]);
    }

    function completeAllTasks() {
        const tasksWithCompletionTime = tasks.map(task => ({ ...task, completedAt: new Date() }));
        setCompletedTasks([...completedTasks, ...tasksWithCompletionTime]);
        setTasks([]);
    }

    function editTask(index) {
        setNewTask(tasks[index].name);
        setSelectedDate(tasks[index].completionDate);
        setEditingIndex(index);
    }

    function returnTask(index) {
        const taskToReturn = { ...completedTasks[index], completedAt: null };
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        setTasks([...tasks, taskToReturn]);
    }

    function formatDate(date) {
        return date.toLocaleString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric',
            hour12: true 
        });
    }

    return (
        <>
            <div className="main-container">
                <ProgressBar completedTasks={completedTasks.length} totalTasks={tasks.length + completedTasks.length} />
                <div className="container">
                    <div className="header">
                        <h1 style={{ color: '#5E1B89' }}>To-Do List</h1>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter task..."
                                value={newTask}
                                onChange={handleInputChange}
                                className="task-input"
                            />
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Select completion date & time"
                                className="date-picker"
                            />
                            <button
                                className={editingIndex !== null ? "update-button" : "add-button"}
                                onClick={addTask}
                            >
                                {editingIndex !== null ? "Update" : "Add"}
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className="task-container">
                        {tasks.length === 0 ? (
                            <div className="no-tasks">🎉 No Tasks! 🎉</div>
                        ) : (
                            <ol>
                                {tasks.map((task, index) => (
                                    <li key={index}>
                                        <div className="task-content">
                                            <span className="text">{task.name}</span>
                                            <div className="task-details">
                                                <span>Complete by: {formatDate(task.completionDate)}</span>
                                                {task.completedAt && (
                                                    <div>
                                                        <span>Completed at: {formatDate(task.completedAt)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {editingIndex !== index && (
                                            <div className="button-container">
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteTask(index)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                                <button
                                                    className="move-button"
                                                    onClick={() => completeTask(index)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                                <button
                                                    className="edit-button"
                                                    onClick={() => editTask(index)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                    <div className="action-buttons">
                        <button
                            className="complete-all-button"
                            onClick={completeAllTasks}
                        >
                            Complete All
                        </button>
                        <button
                            className="delete-all-button"
                            onClick={deleteAllTasks}
                        >
                            Clear Tasks
                        </button>
                    </div>
                </div>

                <div className="container">
                    <div className="header">
                        <h1 style={{ color: '#5E1B89' }}>Completed Tasks</h1>
                        <hr />
                    </div>
                    <div className="task-container">
                        {completedTasks.length === 0 ? (
                            <div className="no-tasks">No completed tasks yet</div>
                        ) : (
                            <ol>
                                {completedTasks.map((task, index) => (
                                    <li key={index}>
                                        <div className="task-content">
                                            <span className="text">{task.name}</span>
                                            <div className="task-details">
                                                <span>Due date: {formatDate(task.completionDate)}</span>
                                                <div>
                                                    <span>Completed at: {formatDate(task.completedAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="button-container">
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteCompletedTask(index)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                            <button
                                                className="return-button"
                                                onClick={() => returnTask(index)}
                                            >
                                                <FontAwesomeIcon icon={faUndo} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                    <div className="footer-buttons">
                        <button
                            className="delete-all-button"
                            onClick={deleteAllCompletedTasks}
                        >
                            Clear Tasks 
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
