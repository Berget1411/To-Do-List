import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default function project(name) {
  let tasks = [];

  const setName = (newName) => (name = newName);
  const getName = () => name;

  const setTasks = (newTasks) => (tasks = newTasks);
  const getTasks = () => tasks;

  const getTask = (taskTitle) => {
    return tasks.find((task) => task.getTitle() === taskTitle);
  };
  const addTask = (newTask) => tasks.push(newTask);
  const removeTask = (taskTitle) => {
    const taskToRemove = tasks.find((task) => task.getTitle() === taskTitle);
    tasks.splice(tasks.indexOf(taskToRemove));
  };

  const getTasksToday = () => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isToday(toDate(taskDate));
    });
  };
  const getTasksThisWeek = () => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isThisWeek(subDays(toDate(taskDate), 1));
    });
  };
  return {
    setName,
    getName,
    setTasks,
    getTasks,
    getTask,
    addTask,
    removeTask,
    getTasksToday,
    getTasksThisWeek,
  };
}
