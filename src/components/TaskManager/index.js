import React, { useState } from 'react';
import './index.css';

const TaskManager = () => {
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newAssign, setNewAssign] = useState('');
  const [totalTaskList, setTotalTaskList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false); // State for controlling form visibility

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (editingIndex === -1) {
      const newTask = {
        description: newDescription,
        date: newDate,
        time: newTime,
        assign: newAssign,
      };

      setTotalTaskList([...totalTaskList, newTask]);
    } else {
      const updatedTasks = [...totalTaskList];
      updatedTasks[editingIndex] = {
        description: newDescription,
        date: newDate,
        time: newTime,
        assign: newAssign,
      };

      setTotalTaskList(updatedTasks);
      setEditingIndex(-1);
    }

    setNewDescription('');
    setNewDate('');
    setNewTime('');
    setNewAssign('');
    setShowForm(false); // Hide the form after submission or editing
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewDescription(totalTaskList[index].description);
    setNewDate(totalTaskList[index].date);
    setNewTime(totalTaskList[index].time);
    setNewAssign(totalTaskList[index].assign);
    setShowForm(false); // Hide the new task form
  };

  const handleDelete = (index) => {
    const updatedTasks = [...totalTaskList];
    updatedTasks.splice(index, 1);
    setTotalTaskList(updatedTasks);
    setEditingIndex(-1);
    setShowForm(false); // Hide the form after deleting
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setNewDescription('');
    setNewDate('');
    setNewTime('');
    setNewAssign('');
    setShowForm(false); // Hide the form when canceled
  };

  return (
    <div className='task-manager-container'>
      <div className='header'>
        <h5 className='task-count'>Task {totalTaskList.length}</h5>
        {!showForm && (
          <button className='plush-button' type="button" onClick={() => setShowForm(true)}>
            +
          </button>
        )}
      </div>
      {showForm && editingIndex === -1 && (
        <form className='form-container' onSubmit={onSubmitForm}>
          <div className='input-container'>
            <label className='input-label' htmlFor="description">Task Description</label>
            <br />
            <input
              className='input'
              id="description"
              type="text"
              placeholder="Enter task description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className='date-time-container'>
            <div>
              <label className='input-label-date' htmlFor="date">Date:</label>
              <br />
              <input
                className='input-date'
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <label className='input-label-time' htmlFor="time">Time:</label>
              <br />
              <input
                className='input-date'
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </div>
          <label className='input-label-assingner' htmlFor="assign">Assign User</label>
          <br />
          <select
            id="assign"
            className='input'
            placeholder="Enter assignee"
            value={newAssign}
            onChange={(e) => setNewAssign(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <br />
          <div className='button-container'>
            <button className='cancel-button' type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button className='save-button' type="submit">Save</button>
          </div>
        </form>
      )}
      <div className='bottom-container'>
        <ul>
          {totalTaskList.map((task, index) => (
            <li className='list-item' key={index}>
              {index === editingIndex ? (
                <div>
                  <form className='edit-form-container' onSubmit={onSubmitForm}>
                    <label className='edit-input-label' htmlFor="description">Task Description</label>
                    <br />
                    <input
                      className='edit-input'
                      id="description"
                      type="text"
                      placeholder="Enter task description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <div className='edit-date-time-container'>
                      <div>
                        <label className='edit-input-label-date' htmlFor="date">Date</label>
                        <br />
                        <input
                          className='edit-input-date'
                          id="date"
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className='edit-input-label-time' htmlFor="time">Time</label>
                        <br />
                        <input
                          className='edit-input-date'
                          id="time"
                          type="time"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <label className='edit-input-label-assigner' htmlFor="assign">Assign User</label>
                    <br />
                    <input
                      className='edit-input'
                      id="assign"
                      type="text"
                      placeholder="Enter assignee"
                      value={newAssign}
                      onChange={(e) => setNewAssign(e.target.value)}
                    />
                    <br />
                    <div className='button-container'>
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className='result-container'>
                   <div>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    </div>
                    <div>
                    <p>{task.description}</p>
                  <div>
                    <p>{task.date}</p>
                    <p>{task.time}</p> 
                  </div>
                  </div>
                  <button type="button" onClick={() => handleEdit(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
