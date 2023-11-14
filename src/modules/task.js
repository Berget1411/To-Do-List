export default function task(taskTitle, description, dueDate, priority) {
  let isCompleted = false;

  const setTitle = (tit) => (taskTitle = tit);
  const getTitle = () => taskTitle;

  const setDescription = (des) => (description = des);
  const getDescription = () => description;

  const setDate = (due) => (dueDate = due);
  const getDate = () => dueDate;

  const getDateFormatted = () => {
    const day = dueDate.split("-")[2];
    const month = dueDate.split("-")[1];
    const year = dueDate.split("-")[0];
    return `${month}/${day}/${year}`;
  };

  const getDateWithoutYear = () => {
    const day = dueDate.split("-")[2];
    const month = dueDate.split("-")[1];
    return `${month}/${day}`;
  };

  const setPriority = (prio) => (priority = prio);
  const getPriority = () => priority;

  const completeTask = () => (isCompleted = true);
  const getIsCompleted = () => isCompleted;

  return {
    setTitle,
    getTitle,
    setDescription,
    getDescription,
    setDate,
    getDate,
    getDateFormatted,
    getDateWithoutYear,
    setPriority,
    getPriority,
    completeTask,
    getIsCompleted,
  };
}
