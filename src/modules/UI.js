import projectIconSrc from "../assets/images/feather.svg";

import Task from "./task";
import Project from "./project";
import ToDoList from "./todolist";

const toDoList = new ToDoList();
const project1 = new Project("project1");
const task1 = new Task("task1", "description1", "dueDate1", "priority1");
project1.addTask(task1);
toDoList.addProject(project1);

const toggleAddTask = () => {
  document.querySelector("#add-task-popup").classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
};

//handle tasks
const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", toggleAddTask);

const closeAddTaskPopup = document.querySelector("#close-add-task-popup");
closeAddTaskPopup.addEventListener("click", toggleAddTask);

//

//handle projects

const deleteProject = () => {
  const currentProject = document.querySelector(".header-left h2").textContent;

  toDoList.removeProject(currentProject);

  document.querySelector(".header-left h2").textContent = ""; // update header
  editProjectToggle(); // close pop up
  renderProjects(); // update sidebar

  document.querySelector(".add-task-button").classList.add("not-active");
  document.querySelector(".edit-project-button").classList.add("not-active");
};

const deleteProjectButton = document.querySelector(".delete-project");
deleteProjectButton.addEventListener("click", deleteProject);

const editProjectToggle = () => {
  document.querySelector("#edit-project-popup").classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
  document.querySelector("#edit-project-input").value =
    document.querySelector(".header-left h2").textContent;
};

const editProjectForm = document.querySelector("#edit-project-popup form");
const editProject = (e) => {
  e.preventDefault();
  const currentProject = document.querySelector(".header-left h2").textContent;
  const newName = document.querySelector("#edit-project-input").value;

  toDoList.getProject(currentProject).setName(newName);
  document.querySelector(".header-left h2").textContent = newName; // update header
  editProjectToggle(); // close pop up
  renderProjects(); // update sidebar
};
editProjectForm.addEventListener("submit", editProject);

const closeEditProjectForm = document.querySelector(".close-edit-project-form");
closeEditProjectForm.addEventListener("click", editProjectToggle);

const openProject = (e) => {
  const currentProject = e.target.classList;
  const addTaskButton = document.querySelector(".add-task-button");
  addTaskButton.classList.remove("not-active");
  const editProjectButton = document.querySelector(".edit-project-button");
  editProjectButton.classList.remove("not-active");
  editProjectButton.addEventListener("click", editProjectToggle);

  const headerTitle = document.querySelector("header h2");
  headerTitle.textContent = currentProject;
};

const renderProjects = () => {
  const projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = `PROJECTS (${toDoList.projects.length})`;
  const projectsList = document.querySelector(".projects-list");
  projectsList.textContent = ""; //reset projectList

  toDoList.projects.forEach((project) => {
    const projectContainer = document.createElement("li");
    projectContainer.classList.add(project.getName());
    const projectIcon = document.createElement("img");
    projectIcon.src = projectIconSrc;
    projectIcon.classList.add(project.getName());
    const projectName = document.createElement("p");
    projectName.textContent = project.getName();
    projectName.classList.add(project.getName());
    projectContainer.append(projectIcon, projectName);

    projectContainer.addEventListener("click", openProject);

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

//

//collapse sidebar
const collapseButton = document.querySelector(".collapse");
const toggleSidebar = () => {
  document.querySelector(".sidebar").classList.toggle("not-active");
  document.querySelector(".content").classList.toggle("hide-sidebar");

  const hamburgerMenu = document.querySelector(".hamburger-menu");
  hamburgerMenu.classList.toggle("not-active");
  hamburgerMenu.addEventListener("click", toggleSidebar);
};
collapseButton.addEventListener("click", toggleSidebar);
//
