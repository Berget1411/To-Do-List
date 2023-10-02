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
  projectsList.textContent = ""; //reset projectList

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

renderProjects();

const createProjectButton = document.querySelector(".create-project");
const createProjectForm = document.querySelector("#add-project-popup form");

const AddProjectToggle = () => {
  const addProjectPopup = document.querySelector("#add-project-popup");
  addProjectPopup.classList.toggle("active");
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("active");
};

createProjectButton.addEventListener("click", AddProjectToggle);

const closeAddProjectForm = document.querySelector(".close-add-project-form");

closeAddProjectForm.addEventListener("click", AddProjectToggle);

const createProject = (e) => {
  e.preventDefault();
  const newProject = new Project(
    document.querySelector("#add-project-input").value
  );
  toDoList.addProject(newProject);
  renderProjects();

  document.querySelector("#add-project-input").value = "";
  AddProjectToggle();
};
createProjectForm.addEventListener("submit", createProject);
