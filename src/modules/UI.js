import projectIconSrc from "../assets/images/feather.svg";

import Task from "./task";
import Project from "./project";
import ToDoList from "./todolist";

const toDoList = new ToDoList();
const project1 = new Project("project1");
const task1 = new Task("task1", "description1", "dueDate1", "priority1");
project1.addTask(task1);
toDoList.addProject(project1);

const renderProjects = () => {
  const projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = `PROJECTS (${toDoList.projects.length})`;
  const projectsList = document.querySelector(".projects-list");

  toDoList.projects.forEach((project) => {
    const projectContainer = document.createElement("li");
    const projectIcon = document.createElement("img");
    projectIcon.src = projectIconSrc;
    const projectName = document.createElement("p");
    projectName.textContent = project.getName();
    projectContainer.append(projectIcon, projectName);

    projectsList.append(projectContainer);
  });
};

export default renderProjects;
