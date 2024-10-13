import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { getTasks } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="container">
      {/* <TaskForm refreshTasks={refreshTasks} /> */}
      <TaskList tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
}

export default Dashboard;
