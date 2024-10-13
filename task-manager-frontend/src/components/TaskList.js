import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api"; // Import deleteTask
import TaskForm from "./TaskForm"; // Import your TaskForm
import Modal from "react-modal"; // Import Modal component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view task modal
  const [currentTask, setCurrentTask] = useState(null); // State for the task being edited

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const refreshTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const openModal = (task = null) => {
    setCurrentTask(task); // Set the current task for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(null); // Reset the current task
    setIsModalOpen(false);
    setIsViewModalOpen(false); // Close view modal
  };

  const handleCreateTask = async (task) => {
    await createTask(task);
    closeModal();
    refreshTasks();
  };

  const handleUpdateTask = async (task) => {
    await updateTask(currentTask.id, task); // Update the task
    closeModal();
    refreshTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id); // Delete the task
    refreshTasks();
  };

  const openViewModal = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true); // Open view task modal
  };

  return (
    <div className="antialiased text-slate-700 mx-2">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-medium">Tasks list</h1>
          <div className="inline-flex space-x-2 items-center">
            <button
              className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
              onClick={() => openModal()} // Open modal for new task
            >
              <svg
                width="17px"
                height="17px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" fill="none" width="20" height="20" />
                <g>
                  <path
                    fill="white"
                    d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"
                  />
                </g>
              </svg>
              <span className="text-sm font-dark text-white hidden md:block">
                Add
              </span>
            </button>
          </div>
        </div>
        <p className="text-slate-500">Hello, here are your latest tasks</p>

        <div id="tasks" className="my-5">
  {Array.isArray(tasks) && tasks.length > 0 ? (
    tasks.map((task) => (
      <div
        key={task.id}
        className={`flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 ${
          task.completed
            ? "border-l-transparent text-slate-500 line-through"
            : "border-l-transparent"
        }`}
      >
        <div className="inline-flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${
              task.completed
                ? "text-slate-500"
                : "hover:text-indigo-600 hover:cursor-pointer"
            }`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className={`${task.completed ? "line-through" : ""}`}>
            {task.title}
          </div>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            onClick={() => openModal(task)} // Open modal for editing
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 ml-2"
            onClick={() => handleDeleteTask(task.id)} // Delete task
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 6V18C7 19.1046 7.89543 20 9 20H15C16.1046 20 17 19.1046 17 18V6"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 ml-2"
            onClick={() => openViewModal(task)} // Open view modal
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C7.58172 4 4 10 4 10C4 10 7.58172 16 12 16C16.4183 16 20 10 20 10C20 10 16.4183 4 12 4Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-slate-500 text-center">No tasks available.</p>
  )}
</div>

      </div>

      {/* Modal for creating/editing tasks */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-full max-w-md mx-auto p-4 rounded bg-white mt-16 sm:mt-24 md:mt-32 lg:mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {currentTask ? "Edit Task" : "Add New Task"}
        </h2>
        <TaskForm
          refreshTasks={refreshTasks}
          handleCreateTask={currentTask ? handleUpdateTask : handleCreateTask} // Use the correct handler
          task={currentTask} // Pass the current task for editing
        />

        <button
          onClick={closeModal}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </Modal>

      {/* Modal for viewing task details */}

      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeModal}
        className="w-full max-w-md mx-auto p-4 rounded bg-white mt-16 sm:mt-24 md:mt-32 lg:mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {currentTask && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {currentTask.title}
            </h2>{" "}
            <p>{currentTask.description}</p>
          </div>
        )}

        {/* <p>{currentTask.description}</p> */}

        <button
          onClick={closeModal}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default TaskList;
