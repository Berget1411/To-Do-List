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
}
