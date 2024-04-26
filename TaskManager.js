import React from 'react'
import { Link } from 'react-router-dom'
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import Header from './Header';
import Card from './Card';
import { useState } from 'react';
function TaskManager() {
    const [add, setAdd] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const [singleTask, setSingleTask] = useState('');
    const [singleDes, setSingleDes] = useState('');
  
    const UpdateTask = (id) => {
      setTasks(
        Tasks.map((t) => (t.id === id ? { ...t, complete: true } : t))
      );
    };
  
    const deleteTask = (id) => {
      setTasks(Tasks.filter((t) => (t.id === id ? false : true)));
    };
  
    const addToCard = () => {
      const id = Tasks.length === 0 ? 1 : Tasks.length + 1;
      const taskDetail = {
        id: id,
        task: singleTask,
        des: singleDes,
        complete: false,
      };
      setTasks([...Tasks, taskDetail]);
    };
  
    const ClearInput = () => {
      setSingleTask('');
      setSingleDes('');
    };
  
    const handleCustomTask = (event) => {
      setSingleTask(event.target.value);
    };
  
    const handleCustomDes = (event) => {
      setSingleDes(event.target.value);
    };
  
    const handleInput = () => {
      setAdd(!add);
    };
  return (
    <div>
          <div className='inputSection'>
        <Header handleInput={handleInput} />
        {add === true ? (
          <>
            <CustomInput
              value={singleTask}
              placeHolder='Enter Task'
              name='Task'
              change={handleCustomTask}
            />
            <CustomInput
              value={singleDes}
              placeHolder='Enter Description'
              name='Description'
              change={handleCustomDes}
            />
            <div className='btnwrapper'>
              <CustomButton
                color='White'
                bg='#1877F2'
                name='Save Task'
                click={addToCard}
              />
              <CustomButton color='White' bg='red' name='Cancel' click={ClearInput} />
            </div>
          </>
        ) : null}
      </div>

      <div className='cardSection'>
        {Tasks.map((t) => (
          <Card
            title={t.task}
            des={t.des}
            key={t.id}
            delete={() => deleteTask(t.id)}
            update={() => UpdateTask(t.id)}
            complete={t.complete}
          />
        ))}
      </div>

    </div>
  )
}

export default TaskManager