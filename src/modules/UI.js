import projectIconSrc from "../assets/images/feather.svg";

import Task from "./task";
import Project from "./project";
import ToDoList from "./todolist";

const toDoList = new ToDoList();
const project1 = new Project("project1");
const task1 = new Task("task1", "description1", "2023-10-05", "low");
const task2 = new Task("task2", "description2", "2023-10-06", "high");
project1.addTask(task1);
project1.addTask(task2);
toDoList.addProject(project1);

//

const renderTasks = () => {
  const todoTasks = document.querySelector("#todo ul");
  const doneTasks = document.querySelector("#done ul");
  const currentProject = document.querySelector(".header-left h2").textContent;
  document.querySelector("#task-display").classList.remove("not-active");

  const tasks = toDoList.getProject(currentProject).getTasks();

  tasks.forEach((task) => {
    const taskContainer = document.createElement("li");
    taskContainer.classList.add("task-container");

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = task.getTitle();

    const taskFooter = document.createElement("div");
    taskFooter.classList.add("task-footer");
    const taskPriority = document.createElement("div");
    taskPriority.classList.add("task-priority");
    taskPriority.textContent = task.getPriority();
    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = task.getDate();
    taskFooter.append(taskPriority, taskDueDate);

    taskContainer.append(taskTitle, taskFooter);

    if (task.isCompleted == false) {
      todoTasks.append(taskContainer);
    } else {
      doneTasks.append(taskContainer);
    }
  });
};
//handle tasks

const toggleAddTask = () => {
  document.querySelector("#add-task-popup").classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
};

const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", toggleAddTask);

const closeAddTaskPopup = document.querySelector("#close-add-task-popup");
closeAddTaskPopup.addEventListener("click", toggleAddTask);

const clearAddTaskForm = () => {
  document.querySelector("#input-add-task-title").value = "";
  document.querySelector("#input-add-task-descrip").value = "";
  document.querySelector("#input-add-task-due-date").value = "";
  document.querySelector("#input-add-task-priority").value = "";
};

const addTaskForm = document.querySelector("#add-task-popup form");
const createTask = (e) => {
  e.preventDefault();
  const currentProject = document.querySelector(".header-left h2").textContent;
  const taskTitle = document.querySelector("#input-add-task-title").value;
  const taskDescription = document.querySelector(
    "#input-add-task-descrip"
  ).value;
  const taskDueDate = document.querySelector("#input-add-task-due-date").value;
  const taskPriority = document.querySelector("#input-add-task-priority").value;

  const newTask = new Task(
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  );
  toDoList.getProject(currentProject).addTask(newTask);
  console.log(toDoList.projects[0].getTasks());

  clearAddTaskForm();
  toggleAddTask();
};
addTaskForm.addEventListener("submit", createTask);

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

  renderTasks();
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
  document.querySelector("#add-project-popup").classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
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
