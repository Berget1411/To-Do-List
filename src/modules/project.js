import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskTitle) {
    return this.tasks.find((task) => task.getTitle() === taskTitle);
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  removeTask(taskTitle) {
    const taskToRemove = this.tasks.find(
      (task) => task.getTitle() === taskTitle
    );
    this.tasks.splice(this.tasks.indexOf(taskToRemove));
  }

  getTasksToday() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isToday(toDate(taskDate));
    });
  }
  getTasksThisWeek() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isThisWeek(subDays(taskDate), 1);
    });
  }
}
