export default class ToDoList {
  constructor() {
    this.projects = [];
  }
  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }
  removeProject(projectName) {
    const projectToRemove = this.projects.find(
      (project) => project.getName() === projectName
    );
    this.projects.splice(this.projects.indexOf(projectToRemove));
  }
}
