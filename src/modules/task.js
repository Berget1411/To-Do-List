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
