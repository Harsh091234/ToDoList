"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, description }])

    setTitle("");
    setDescription("");
    
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  }

  useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    setMainTask(JSON.parse(storedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(mainTask));
}, [mainTask]);

  let renderTask = <h2>No tasks available</h2>
  if (mainTask.length > 0) {
    renderTask = mainTask.map((e, i) => {
      return (

          <li key={i}>
            <div className='mb-2  flex justify-between items-center'>
              <h1 className='  font-bold'>{e.title}</h1>
              <h1>{e.description}</h1>
              <button className='bg-red-400 py-1 px-2 rounded-md text-xs text-white cursor-pointer' onClick={() => deleteHandler(i)}>Delete</button>
            </div>

          </li>
        
      )
    }

    )
  }
  return (
    <>
      <div className='bg-black text-white text-5xl py-4 font-bold text-center'>My ToDo List</div>
      <form className=" px-2 mt-10 " onSubmit={submitHandler}>
        <input type="text" className='max-md:mb-2 max-md:ml-0 max-md:w-full outline-0 border-2 border-stone-700 rounded-md  ml-2 px-2 py-1.5 text-md' placeholder='Enter title here' value={title} onChange={(e) => setTitle(e.target.value)} required
        />
        <input type="text" className='max-md:mb-2 max-md:ml-0  max-md:w-full outline-0 border-2 border-stone-700 rounded-md  ml-7   px-2 py-1.5 text-md' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button className='  max-md:w-3/4 max-md:mx-auto max-md:block  text-white bg-stone-700 cursor-pointer text-md px-5 ml-5 rounded-md py-2'>Add Task</button>
      </form>

      <div className='bg-slate-300 p-3 mt-4'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>

  )
}

export default page