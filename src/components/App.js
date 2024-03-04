import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {
    // Check if the task already exists in the tasks array
    const taskIndex = tasks.findIndex((task) => task.id === taskToAdd.id);
  
    if (taskIndex !== -1) {
      // If the task exists, update it in the array
      let updatedTasks = [...tasks];
      updatedTasks[taskIndex] = taskToAdd;
      setTasks(updatedTasks);
    } else {
      // If the task doesn't exist, add the new task to the array
      setTasks((tasks) => [...tasks, taskToAdd]);
    }
  
    // Save the updated tasks to localStorage
    saveTasksToLocalStorage(tasks);
  }
  

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    // Find the task with the given id
    const taskToUpdate = tasks.find((task) => task.id === id);
  
    if (taskToUpdate) {
      // Update the status of the task
      taskToUpdate.status = newStatus;
  
      // Create a new array with the updated task
      const updatedTasks = tasks.map((task) => {
        return task.id === id ? taskToUpdate : task;
      });
  
      // Set the updated tasks array in the state
      setTasks(updatedTasks);
  
      // Save the updated tasks to localStorage
      saveTasksToLocalStorage(updatedTasks);
    }
  }
  

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;