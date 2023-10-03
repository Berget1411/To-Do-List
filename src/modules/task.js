export default class Task {
  constructor(taskTitle, description, dueDate, priority) {
    this.taskTitle = taskTitle;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false;
  }

  setTitle(taskTitle) {
    this.taskTitle = taskTitle;
  }

  getTitle() {
    return this.taskTitle;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDate() {
    return this.dueDate;
  }

  getDateFormatted() {
    const day = this.dueDate.split("/")[0];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[2];
    return `${month}/${day}/${year}`;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }

  completeTask() {
    this.isCompleted = true;
  }
}
