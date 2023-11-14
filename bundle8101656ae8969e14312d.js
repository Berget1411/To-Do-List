"use strict";
(self["webpackChunktaskstack"] = self["webpackChunktaskstack"] || []).push([["bundle"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.html */ "./src/template.html");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");




/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_images_feather_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/images/feather.svg */ "./src/assets/images/feather.svg");
/* harmony import */ var _assets_images_flag_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/images/flag.svg */ "./src/assets/images/flag.svg");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todolist */ "./src/modules/todolist.js");





var toDoList = (0,_todolist__WEBPACK_IMPORTED_MODULE_4__["default"])();
var project1 = (0,_project__WEBPACK_IMPORTED_MODULE_3__["default"])("TaskStack-Project");
var task1 = (0,_task__WEBPACK_IMPORTED_MODULE_2__["default"])("Light & Dark mode", "User should be able to toggle a switch to make website either dark or light mode", "2023-10-05", "low");
var task2 = (0,_task__WEBPACK_IMPORTED_MODULE_2__["default"])("Restructure Code into Modules", "This task involves organizing and restructuring the project's codebase into modular components. Breaking down the code into manageable modules will improve code maintainability, readability, and scalability.", "2023-10-06", "high");
// const task3 = new Task(
//   "Local Storage Implementation",
//   "Implement local storage functionality to allow users to save their boards and tasks locally on their devices. This feature ensures that users can pick up where they left off even after closing and reopening the application.",
//   "2023-10-08",
//   "med"
// );
task2.completeTask();
project1.addTask(task1);
project1.addTask(task2);
toDoList.addProject(project1);

//light and dark mode

document.querySelector(".light-dark-mode input").addEventListener("click", function () {
  document.documentElement.classList.toggle("light");
});

//date tasks

var renderSpecificTasks = function renderSpecificTasks(date) {
  document.querySelector(".add-task-button").classList.add("not-active");
  document.querySelector(".edit-project-button").classList.add("not-active");
  var projectDisplay = document.querySelector("#task-display");
  projectDisplay.textContent = "";
  projectDisplay.classList.remove("not-active");
  var projects = toDoList.getProjects();
  projects.forEach(function (project) {
    var createCard = function createCard(taskList) {
      var container = document.createElement("div");
      container.classList.add("date-container");
      var header = document.createElement("div");
      header.classList.add("date-header");
      var containerTitle = document.createElement("h3");
      containerTitle.textContent = project.getName();
      var line = document.createElement("div");
      line.classList.add("hr");
      var seeProject = document.createElement("button");
      seeProject.textContent = "SEE PROJECT";
      seeProject.classList.add(project.getName());
      seeProject.addEventListener("click", openProject);
      header.append(containerTitle, line, seeProject);
      var tasks = document.createElement("ul");
      tasks.classList.add("date-tasks");
      taskList.forEach(function (task) {
        var taskContainer = document.createElement("li");
        var taskTitle = document.createElement("h4");
        taskTitle.textContent = task.getTitle();
        var taskFooter = document.createElement("div");
        taskFooter.classList.add("task-footer");
        var taskPriority = document.createElement("div");
        taskPriority.classList.add("task-priority");
        var taskPriorityFlag = document.createElement("img");
        taskPriorityFlag.classList.add(task.getPriority());
        taskPriorityFlag.src = _assets_images_flag_svg__WEBPACK_IMPORTED_MODULE_1__;
        var taskPriorityText = document.createElement("p");
        taskPriorityText.textContent = task.getPriority();
        taskPriority.append(taskPriorityFlag, taskPriorityText);
        var taskDueDate = document.createElement("div");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = "due ".concat(task.getDateWithoutYear());
        taskFooter.append(taskPriority, taskDueDate);
        taskContainer.append(taskTitle, taskFooter);
        taskContainer.addEventListener("click", function () {
          openTask(task.getTitle(), project.getName());
          document.querySelector("#opened-task-edit").classList.add("not-active");
          var mainButton = document.querySelector("#opened-task-main");
          mainButton.classList.add(project.getName());
          mainButton.textContent = "Open Project";
          mainButton.removeEventListener("click", completeTask);
          mainButton.removeEventListener("click", deleteTask);
          mainButton.addEventListener("click", function (e) {
            openProject(e);
            togglePopup("#opened-task");
            document.querySelector("#opened-task-edit").classList.remove("not-active");
          }, {
            once: true
          });
        });
        tasks.append(taskContainer);
      });
      container.append(header, tasks);
      projectDisplay.append(container);
    };
    if (date == "today") {
      if (project.getTasksToday().length > 0) {
        createCard(project.getTasksToday());
      }
    } else if (date == "week") {
      if (project.getTasksThisWeek().length > 0) {
        createCard(project.getTasksThisWeek());
      }
    } else {
      if (project.getTasks().length > 0) {
        createCard(project.getTasks());
      }
    }
  });
};
document.querySelector("#today-tasks").addEventListener("click", function (e) {
  document.querySelector(".header-left h2").textContent = "Today";
  renderSpecificTasks("today");
});
document.querySelector("#week-tasks").addEventListener("click", function (e) {
  document.querySelector(".header-left h2").textContent = "This Week";
  renderSpecificTasks("week");
});
document.querySelector("#all-tasks").addEventListener("click", function (e) {
  document.querySelector(".header-left h2").textContent = "All Time";
  renderSpecificTasks("all");
});

//

var togglePopup = function togglePopup(elementId) {
  document.querySelector(elementId).classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
};

//

var deleteEditedTask = function deleteEditedTask(task) {
  var currentProjectName = document.querySelector(".header-left h2").textContent;
  toDoList.getProject(currentProjectName).removeTask(task.getTitle());
  renderTasks();
};
var editTask = function editTask(task) {
  var title = document.querySelector("#input-edit-task-title");
  title.value = task.getTitle();
  var description = document.querySelector("#input-edit-task-descrip");
  description.value = task.getDescription();
  var dueDate = document.querySelector("#input-edit-task-due-date");
  dueDate.value = task.getDate();
  var priority = document.querySelector("#input-edit-task-priority");
  priority.value = task.getPriority();
  document.querySelector("#edit-task form").addEventListener("submit", function (e) {
    e.preventDefault();
    task.setTitle(title.value);
    task.setDescription(description.value);
    task.setDate(dueDate.value);
    task.setPriority(priority.value);
    togglePopup("#edit-task");
    renderTasks();
  }, {
    once: true
  });
  document.querySelector("#close-edit-task-popup").addEventListener("click", function () {
    togglePopup("#edit-task");
  }, {
    once: true
  });
  document.querySelector("#delete-task-edit-popup").addEventListener("click", function () {
    deleteEditedTask(task);
    togglePopup("#edit-task");
  }, {
    once: true
  });
};
var completeTask = function completeTask() {
  var currentProjectName = document.querySelector(".header-left h2").textContent;
  var currentTaskTitle = document.querySelector("#opened-task-title").textContent;
  toDoList.getProject(currentProjectName).getTask(currentTaskTitle).completeTask();
  renderTasks();
  togglePopup("#opened-task");
};
var deleteTask = function deleteTask() {
  var currentProjectName = document.querySelector(".header-left h2").textContent;
  var currentTaskTitle = document.querySelector("#opened-task-title").textContent;
  toDoList.getProject(currentProjectName).removeTask(currentTaskTitle);
  renderTasks();
  togglePopup("#opened-task");
};
document.querySelector("#opened-task-close").addEventListener("click", function () {
  togglePopup("#opened-task");
});
var openTask = function openTask(taskName, projectName) {
  var currentProjectName = document.querySelector(".header-left h2").textContent;
  var projectNameExist = function projectNameExist() {
    if (projectName == undefined) {
      return toDoList.getProject(currentProjectName).getTask(taskName);
    } else {
      return toDoList.getProject(projectName).getTask(taskName);
    }
  };
  var task = projectNameExist();
  var openedTaskContainer = document.querySelector("#opened-task");
  var status = document.querySelector("#opened-task-status");
  var mainButton = document.querySelector("#opened-task-main");
  mainButton.removeEventListener("click", completeTask);
  mainButton.removeEventListener("click", deleteTask);
  if (task.getIsCompleted() === false) {
    status.textContent = "TODO";
    mainButton.textContent = "Complete Task";
    mainButton.addEventListener("click", completeTask, {
      once: true
    });
  } else {
    status.textContent = "DONE";
    mainButton.textContent = "Delete Task";
    mainButton.addEventListener("click", deleteTask, {
      once: true
    });
  }
  document.querySelector("#opened-task-title").textContent = task.getTitle();
  document.querySelector("#opened-task-description").textContent = task.getDescription();
  document.querySelector("#opened-task-due").textContent = "Due ".concat(task.getDate());
  document.querySelector("#opened-task-priority p").textContent = "".concat(task.getPriority()[0].toUpperCase() + task.getPriority().slice(1), " Priority");
  var priorityIcon = document.querySelector("#opened-task-priority img");
  priorityIcon.classList = "";
  priorityIcon.classList.add(task.getPriority());
  document.querySelector("#opened-task-edit").addEventListener("click", function () {
    togglePopup("#opened-task");
    togglePopup("#edit-task");
    editTask(task);
  }, {
    once: true
  });
  togglePopup("#opened-task");
};
var renderTasks = function renderTasks() {
  var currentProject = document.querySelector(".header-left h2").textContent;
  var taskDisplay = document.querySelector("#task-display");
  taskDisplay.textContent = "";
  var container = document.createElement("container");
  container.classList.add("project-render-task");
  var todoTaskContainer = document.createElement("div");
  todoTaskContainer.setAttribute("id", "todo");
  var todoTitleContainer = document.createElement("div");
  var todoTitle = document.createElement("h3");
  todoTitle.textContent = "TODO";
  todoTitleContainer.append(todoTitle);
  var todoTasks = document.createElement("ul");
  todoTaskContainer.append(todoTitleContainer, todoTasks);
  var doneTaskContainer = document.createElement("div");
  doneTaskContainer.setAttribute("id", "done");
  var doneTitleContainer = document.createElement("div");
  var doneTitle = document.createElement("h3");
  doneTitle.textContent = "DONE";
  doneTitleContainer.append(doneTitle);
  var doneTasks = document.createElement("ul");
  doneTaskContainer.append(doneTitleContainer, doneTasks);
  container.append(todoTaskContainer, doneTaskContainer);
  taskDisplay.append(container);
  taskDisplay.classList.remove("not-active");
  var tasks = toDoList.getProject(currentProject).getTasks();
  tasks.forEach(function (task) {
    var taskContainer = document.createElement("li");
    taskContainer.classList.add("task-container");
    taskContainer.addEventListener("click", function () {
      var taskName = task.getTitle();
      openTask(taskName);
    });
    var taskTitle = document.createElement("h4");
    taskTitle.textContent = task.getTitle();
    var taskFooter = document.createElement("div");
    taskFooter.classList.add("task-footer");
    var taskPriority = document.createElement("div");
    taskPriority.classList.add("task-priority");
    var taskPriorityFlag = document.createElement("img");
    taskPriorityFlag.classList.add(task.getPriority());
    taskPriorityFlag.src = _assets_images_flag_svg__WEBPACK_IMPORTED_MODULE_1__;
    var taskPriorityText = document.createElement("p");
    taskPriorityText.textContent = task.getPriority();
    taskPriority.append(taskPriorityFlag, taskPriorityText);
    var taskDueDate = document.createElement("div");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = "due ".concat(task.getDateWithoutYear());
    taskFooter.append(taskPriority, taskDueDate);
    taskContainer.append(taskTitle, taskFooter);
    if (task.getIsCompleted() == false) {
      todoTasks.append(taskContainer);
    } else {
      doneTasks.append(taskContainer);
    }
  });
};
//handle tasks

var addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", function () {
  togglePopup("#add-task-popup");
});
var closeAddTaskPopup = document.querySelector("#close-add-task-popup");
closeAddTaskPopup.addEventListener("click", function () {
  togglePopup("#add-task-popup");
});
var clearAddTaskForm = function clearAddTaskForm() {
  document.querySelector("#input-add-task-title").value = "";
  document.querySelector("#input-add-task-descrip").value = "";
  document.querySelector("#input-add-task-due-date").value = "";
  document.querySelector("#input-add-task-priority").value = "";
};
var addTaskForm = document.querySelector("#add-task-popup form");
var createTask = function createTask(e) {
  e.preventDefault();
  var currentProject = document.querySelector(".header-left h2").textContent;
  var taskTitle = document.querySelector("#input-add-task-title").value;
  var taskDescription = document.querySelector("#input-add-task-descrip").value;
  var taskDueDate = document.querySelector("#input-add-task-due-date").value;
  var taskPriority = document.querySelector("#input-add-task-priority").value;
  var newTask = (0,_task__WEBPACK_IMPORTED_MODULE_2__["default"])(taskTitle, taskDescription, taskDueDate, taskPriority);
  toDoList.getProject(currentProject).addTask(newTask);
  renderTasks();
  clearAddTaskForm();
  togglePopup("#add-task-popup");
};
addTaskForm.addEventListener("submit", createTask);

//

//handle projects

var deleteProject = function deleteProject() {
  var currentProject = document.querySelector(".header-left h2").textContent;
  toDoList.removeProject(currentProject);
  document.querySelector(".header-left h2").textContent = ""; // update header
  togglePopup("#edit-project-popup"); // close pop up
  renderProjects(); // update sidebar
  document.querySelector("#task-display").classList.toggle("not-active");
  document.querySelector(".add-task-button").classList.add("not-active");
  document.querySelector(".edit-project-button").classList.add("not-active");
};
var deleteProjectButton = document.querySelector(".delete-project");
deleteProjectButton.addEventListener("click", deleteProject);
var editProjectForm = document.querySelector("#edit-project-popup form");
var editProject = function editProject(e) {
  e.preventDefault();
  var currentProject = document.querySelector(".header-left h2").textContent;
  var newName = document.querySelector("#edit-project-input").value;
  toDoList.getProject(currentProject).setName(newName);
  document.querySelector(".header-left h2").textContent = newName; // update header
  togglePopup("#edit-project-popup"); // close pop up
  renderProjects(); // update sidebar
};

editProjectForm.addEventListener("submit", editProject);
var closeEditProjectForm = document.querySelector(".close-edit-project-form");
closeEditProjectForm.addEventListener("click", function () {
  togglePopup("#edit-project-popup");
});
var openProject = function openProject(e) {
  var currentProject = e.target.classList;
  var addTaskButton = document.querySelector(".add-task-button");
  addTaskButton.classList.remove("not-active");
  var editProjectButton = document.querySelector(".edit-project-button");
  editProjectButton.classList.remove("not-active");
  editProjectButton.addEventListener("click", function () {
    togglePopup("#edit-project-popup");
    document.querySelector("#edit-project-input").value = currentProject;
  });
  var headerTitle = document.querySelector(".header-left h2");
  headerTitle.textContent = currentProject;
  renderTasks();
};
var renderProjects = function renderProjects() {
  var projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = "PROJECTS (".concat(toDoList.getProjects().length, ")");
  var projectsList = document.querySelector(".projects-list");
  projectsList.textContent = ""; //reset projectList

  toDoList.getProjects().forEach(function (project) {
    var projectContainer = document.createElement("li");
    projectContainer.classList.add(project.getName());
    var projectIcon = document.createElement("img");
    projectIcon.src = _assets_images_feather_svg__WEBPACK_IMPORTED_MODULE_0__;
    projectIcon.classList.add(project.getName());
    var projectName = document.createElement("p");
    projectName.textContent = project.getName();
    projectName.classList.add(project.getName());
    projectContainer.append(projectIcon, projectName);
    projectContainer.addEventListener("click", openProject);
    projectsList.append(projectContainer);
  });
};
renderProjects();
var createProjectButton = document.querySelector(".create-project");
var createProjectForm = document.querySelector("#add-project-popup form");
createProjectButton.addEventListener("click", function () {
  togglePopup("#add-project-popup");
});
var closeAddProjectForm = document.querySelector(".close-add-project-form");
closeAddProjectForm.addEventListener("click", function () {
  togglePopup("#add-project-popup");
});
var createProject = function createProject(e) {
  e.preventDefault();
  var newProject = (0,_project__WEBPACK_IMPORTED_MODULE_3__["default"])(document.querySelector("#add-project-input").value);
  toDoList.addProject(newProject);
  renderProjects();
  document.querySelector("#add-project-input").value = "";
  togglePopup("#add-project-popup");
};
createProjectForm.addEventListener("submit", createProject);

//

//collapse sidebar
var collapseButton = document.querySelector(".collapse");
var toggleSidebar = function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("not-active");
  document.querySelector(".content").classList.toggle("hide-sidebar");
  var hamburgerMenu = document.querySelector(".hamburger-menu");
  hamburgerMenu.classList.toggle("not-active");
  hamburgerMenu.addEventListener("click", toggleSidebar);
};
collapseButton.addEventListener("click", toggleSidebar);
//

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ project)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/subDays/index.js");

function project(name) {
  var tasks = [];
  var setName = function setName(newName) {
    return name = newName;
  };
  var getName = function getName() {
    return name;
  };
  var setTasks = function setTasks(newTasks) {
    return tasks = newTasks;
  };
  var getTasks = function getTasks() {
    return tasks;
  };
  var getTask = function getTask(taskTitle) {
    return tasks.find(function (task) {
      return task.getTitle() === taskTitle;
    });
  };
  var addTask = function addTask(newTask) {
    return tasks.push(newTask);
  };
  var removeTask = function removeTask(taskTitle) {
    var taskToRemove = tasks.find(function (task) {
      return task.getTitle() === taskTitle;
    });
    tasks.splice(tasks.indexOf(taskToRemove), 1);
  };
  var getTasksToday = function getTasksToday() {
    return tasks.filter(function (task) {
      var taskDate = new Date(task.getDateFormatted());
      return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(taskDate));
    });
  };
  var getTasksThisWeek = function getTasksThisWeek() {
    return tasks.filter(function (task) {
      var taskDate = new Date(task.getDateFormatted());
      return (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(taskDate), 1));
    });
  };
  return {
    setName: setName,
    getName: getName,
    setTasks: setTasks,
    getTasks: getTasks,
    getTask: getTask,
    addTask: addTask,
    removeTask: removeTask,
    getTasksToday: getTasksToday,
    getTasksThisWeek: getTasksThisWeek
  };
}

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ task)
/* harmony export */ });
function task(taskTitle, description, dueDate, priority) {
  var isCompleted = false;
  var setTitle = function setTitle(tit) {
    return taskTitle = tit;
  };
  var getTitle = function getTitle() {
    return taskTitle;
  };
  var setDescription = function setDescription(des) {
    return description = des;
  };
  var getDescription = function getDescription() {
    return description;
  };
  var setDate = function setDate(due) {
    return dueDate = due;
  };
  var getDate = function getDate() {
    return dueDate;
  };
  var getDateFormatted = function getDateFormatted() {
    var day = dueDate.split("-")[2];
    var month = dueDate.split("-")[1];
    var year = dueDate.split("-")[0];
    return "".concat(month, "/").concat(day, "/").concat(year);
  };
  var getDateWithoutYear = function getDateWithoutYear() {
    var day = dueDate.split("-")[2];
    var month = dueDate.split("-")[1];
    return "".concat(month, "/").concat(day);
  };
  var setPriority = function setPriority(prio) {
    return priority = prio;
  };
  var getPriority = function getPriority() {
    return priority;
  };
  var completeTask = function completeTask() {
    return isCompleted = true;
  };
  var getIsCompleted = function getIsCompleted() {
    return isCompleted;
  };
  return {
    setTitle: setTitle,
    getTitle: getTitle,
    setDescription: setDescription,
    getDescription: getDescription,
    setDate: setDate,
    getDate: getDate,
    getDateFormatted: getDateFormatted,
    getDateWithoutYear: getDateWithoutYear,
    setPriority: setPriority,
    getPriority: getPriority,
    completeTask: completeTask,
    getIsCompleted: getIsCompleted
  };
}

/***/ }),

/***/ "./src/modules/todolist.js":
/*!*********************************!*\
  !*** ./src/modules/todolist.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createToDoList)
/* harmony export */ });
function createToDoList() {
  var projects = [];
  var setProjects = function setProjects(newProjects) {
    return projects = newProjects;
  };
  var getProjects = function getProjects() {
    return projects;
  };
  var getProject = function getProject(projectName) {
    return projects.find(function (project) {
      return project.getName() === projectName;
    });
  };
  var addProject = function addProject(newProject) {
    return projects.push(newProject);
  };
  var removeProject = function removeProject(projectName) {
    var projectToRemove = projects.find(function (project) {
      return project.getName() === projectName;
    });
    projects.splice(projects.indexOf(projectToRemove));
  };
  return {
    setProjects: setProjects,
    getProjects: getProjects,
    getProject: getProject,
    addProject: addProject,
    removeProject: removeProject
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* common reused styles */
/* CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

html {
  color-scheme: dark light;
}

img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

/* Custom CSS */
:root {
  --primary-color: #38bdf8;
  --secondary-color: #334155;
  --third-color: #1e293b;
  --white-color: #fafafa;
  --gray-color: #94a3b8;
  --primary-color-svg: brightness(0) saturate(100%) invert(60%) sepia(16%)
    saturate(2562%) hue-rotate(169deg) brightness(107%) contrast(95%);
  --white-color-svg: brightness(0) saturate(100%) invert(100%) sepia(0%)
    saturate(0%) hue-rotate(14deg) brightness(105%) contrast(96%);
  --primary-button-color: #475569;
  --primary-button-hover-color: #53657d;
  --secondary-button-color: #38bdf8;
  --secondary-button-hover-color: #7dd3fc;
}
:root.light {
  --primary-color: #38bdf8;
  --secondary-color: #7497c9;
  --third-color: #5372a3;
  --gray-color: #abbfda;
  --primary-button-color: #6c84a4;
}

.not-active {
  display: none !important;
}

.content {
  min-height: 100vh;
  background-color: var(--third-color);
  font-family: "Roboto", sans-serif;
  display: grid;
  grid-template: "sidebar header" 100px "sidebar main" 1fr/300px 1fr;
}

.hide-sidebar {
  grid-template: "header header" 100px "main main" 1fr/300px 1fr !important;
}

h1 {
  font-family: "Montserrat", sans-serif;
}

h1,
h2,
h3,
h4,
p {
  color: var(--white-color);
}

/* Sidebar general */
.sidebar {
  grid-area: sidebar;
  padding: 40px;
  background-color: var(--secondary-color);
  border-right: 1px solid var(--gray-color);
}
.sidebar h2 {
  color: var(--gray-color);
  margin-top: 30px;
  margin-bottom: 20px;
}

/* Sidebar top */
.sidebar-top {
  margin-bottom: 100px;
}
.sidebar-top img {
  filter: var(--primary-color-svg);
  width: 22px;
}
.sidebar-top .banner {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-top .banner h1 {
  font-size: 2.1em;
}
.sidebar-top .banner img {
  width: 34px;
}
.sidebar-top ul {
  list-style: none;
}
.sidebar-top ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}
.sidebar-top ul li:hover {
  transform: translate(5px);
}
.sidebar-top ul li p {
  font-size: 1.1em;
}
.sidebar-top .create-project {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 10px;
  transition: background-color 0.3s;
}
.sidebar-top .create-project img {
  width: 18px;
  border: 2px solid var(--primary-color);
  border-radius: 100%;
}
.sidebar-top .create-project p {
  font-size: 0.8em;
}
.sidebar-top .create-project:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

/* Sidebar bottom */
.sidebar-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}
.sidebar-bottom img {
  filter: var(--white-color-svg);
}
.sidebar-bottom .light-dark-mode {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.sidebar-bottom .light-dark-mode img {
  width: 25px;
}
.sidebar-bottom .collapse {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  background-color: var(--primary-button-color);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
.sidebar-bottom .collapse img {
  width: 20px;
}
.sidebar-bottom .collapse p {
  font-size: 0.9em;
}
.sidebar-bottom .collapse:hover {
  background-color: var(--primary-button-hover-color);
}
.sidebar-bottom footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-bottom footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: var(--white-color);
}
.sidebar-bottom footer img {
  width: 20px;
}

/* light and dark mode switch */
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24.33px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary-color);
  border-radius: 23.3px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16.66px;
  width: 16.66px;
  border-radius: 50%;
  left: 20.66px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--gray-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--gray-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(-16.66px);
  -ms-transform: translateX(-16.66px);
  transform: translateX(-16.66px);
}

header {
  grid-area: header;
  background-color: var(--secondary-color);
  border-bottom: 1px solid var(--gray-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
}
header h2 {
  font-size: 1.8em;
}
header .hamburger-menu {
  background-color: var(--primary-button-color);
  border-radius: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
header .hamburger-menu:hover {
  background-color: var(--primary-button-hover-color);
}
header img {
  width: 25px;
  filter: var(--white-color-svg);
}

.header-right {
  display: flex;
  gap: 20px;
}
.header-right .add-task-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-button-color);
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}
.header-right .add-task-button:hover {
  background-color: var(--secondary-button-hover-color);
}
.header-right .edit-project-button {
  background-color: var(--primary-button-color);
  border-radius: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
.header-right .edit-project-button:hover {
  background-color: var(--primary-button-hover-color);
}

label {
  color: var(--white-color) !important;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 10;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--secondary-color);
}

.active {
  transform: translate(-50%, -50%) scale(1);
}

.popup-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup-header h2 {
  font-size: 1.2em;
  font-weight: bold;
}
.popup-header button {
  background-color: var(--primary-button-color) !important;
  padding: 5px;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  transition: background-color 0.3s;
}
.popup-header button img {
  width: 15px;
  filter: var(--white-color-svg);
}
.popup-header button:hover {
  background-color: var(--primary-button-hover-color) !important;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  padding: 0px 6px;
}
form label {
  margin-bottom: 8px;
  font-size: 0.9em;
}
form input,
form textarea,
form select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--gray-color);
  margin-bottom: 20px;
  font-size: 0.9em;
}

input:focus {
  outline: none;
  padding: 9px;
  cursor: pointer;
  border: 2px solid var(--primary-color);
}

input[type=submit] {
  padding: 10px;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: var(--secondary-button-color);
  color: var(--white-color);
  transition: background-color 0.3s;
}

input[type=submit]:hover {
  background-color: var(--secondary-button-hover-color);
}

.overlay {
  position: fixed;
  display: none;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 10000px;
  height: 10000px;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 9;
}

.overlay.active {
  display: block;
  pointer-events: all;
}

#opened-task {
  width: 380px !important;
  padding: 40px 30px;
}
#opened-task img {
  width: 20px;
}
#opened-task #opened-task-status {
  color: var(--gray-color);
  font-size: 0.8em;
}
#opened-task #opened-task-title {
  font-size: 1.4em;
}
#opened-task #opened-task-description {
  color: var(--gray-color);
  margin-top: 15px;
  margin-bottom: 20px;
}
#opened-task #opened-task-due {
  width: 120px;
  background-color: var(--primary-button-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  margin-bottom: 10px;
}
#opened-task #opened-task-priority {
  width: 120px;
  display: flex;
  gap: 4px;
  font-size: 0.9em;
  background-color: var(--primary-button-color);
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 30px;
}
#opened-task #opened-task-priority img {
  width: 14px;
}
#opened-task #opened-task-priority .low {
  filter: var(--white-color-svg);
}
#opened-task #opened-task-priority .med {
  filter: brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%);
}
#opened-task #opened-task-priority .high {
  filter: brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(792%) hue-rotate(320deg) brightness(107%) contrast(109%);
}
#opened-task #opened-task-footer {
  display: flex;
  gap: 10px;
}
#opened-task #opened-task-footer > * {
  border: none;
  background-color: var(--secondary-button-color);
  cursor: pointer;
  transition: background-color 0.3s;
}
#opened-task #opened-task-footer > *:hover {
  background-color: var(--secondary-button-hover-color);
}
#opened-task #opened-task-footer #opened-task-main {
  border-radius: 24px;
  padding: 0px 40px;
  font-size: 1.2em;
}
#opened-task #opened-task-footer #opened-task-edit,
#opened-task #opened-task-footer #opened-task-close {
  padding: 8px;
  border-radius: 50%;
  margin-right: 10px;
}
#opened-task #opened-task-footer #opened-task-edit img,
#opened-task #opened-task-footer #opened-task-close img {
  filter: var(--white-color-svg);
  width: 24px;
}

main {
  grid-area: main;
  padding: 40px 80px;
}

#task-display .project-render-task {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
#task-display h3 {
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--gray-color);
}
#task-display ul {
  display: flex;
  flex-direction: column;
  gap: 30px;
  list-style: none;
}
#task-display ul h4 {
  font-size: 1.2em;
}
#task-display ul li {
  background-color: var(--secondary-color);
  padding: 15px 20px;
  width: 280px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}
#task-display ul li:hover {
  transform: translateY(-3px);
  box-shadow: rgba(0, 0, 0, 0.36) 0px 6px 16px;
}
#task-display ul li .task-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
}
#task-display ul li .task-footer .task-priority {
  display: flex;
  gap: 4px;
  background-color: var(--primary-button-color);
  padding: 4px 8px;
  border-radius: 20px;
}
#task-display ul li .task-footer .task-priority img {
  width: 14px;
}
#task-display ul li .task-footer .task-due-date {
  color: var(--gray-color);
}
#task-display ul li .task-footer .low {
  filter: var(--white-color-svg);
}
#task-display ul li .task-footer .med {
  filter: brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%);
}
#task-display ul li .task-footer .high {
  filter: brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(792%) hue-rotate(320deg) brightness(107%) contrast(109%);
}

#todo h3::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: var(--primary-color);
  display: inline-block;
  margin-right: 5px;
}

#done h3::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #6ee7b7;
  display: inline-block;
  margin-right: 5px;
}

.date-container {
  padding: 10px;
  margin-bottom: 100px;
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin-bottom: 40px;
}
.date-header h3 {
  font-size: 1.3em;
  white-space: nowrap;
  height: 5px;
}
.date-header button {
  padding: 7px 17px;
  border-radius: 17px;
  border: none;
  background-color: var(--secondary-button-color);
  font-size: 0.8em;
  cursor: pointer;
  transition: background-color 0.3s;
}
.date-header button:hover {
  background-color: var(--secondary-button-hover-color);
}

.hr {
  height: 1px;
  background-color: var(--gray-color);
  flex: auto;
}

.date-tasks {
  padding: 0px 30px;
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  gap: 20px;
}
.date-tasks li {
  width: 100% !important;
}

@media (max-width: 800px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  .header-right .add-task-button p {
    display: none;
  }
  .date-header {
    gap: 20px;
    justify-content: center;
  }
  .date-header .hr {
    display: none;
  }
  .date-header h3 {
    font-size: 1em;
  }
  .date-header button {
    font-size: 0.6em;
  }
  .date-tasks {
    width: 100px;
  }
  .date-tasks li {
    width: 60% !important;
  }
}
@media (max-width: 500px) {
  #task-display li {
    width: 250px !important;
  }
}`, "",{"version":3,"sources":["webpack://./src/styles/index.scss","webpack://./src/styles/main.scss","webpack://./src/styles/sidebar.scss","webpack://./src/styles/header.scss","webpack://./src/styles/popup.scss","webpack://./src/styles/task_display.scss","webpack://./src/styles/date.scss","webpack://./src/styles/breakpoints.scss"],"names":[],"mappings":"AAAA,yBAAA;AAqBA,cAAA;AAEA;;;EAGE,sBAAA;ACnBF;;ADsBA;EACE,SAAA;EACA,UAAA;EACA,aAAA;ACnBF;;ADsBA;EACE,wBAAA;ACnBF;;ADsBA;;;;EAIE,cAAA;EACA,eAAA;ACnBF;;ADsBA,eAAA;AAEA;EACE,wBAAA;EACA,0BAAA;EACA,sBAAA;EACA,sBAAA;EACA,qBAAA;EAUA;qEAAA;EAEA;iEAAA;EAGA,+BAAA;EACA,qCAAA;EACA,iCAAA;EACA,uCAAA;AC9BF;ADcE;EACE,wBAAA;EACA,0BAAA;EACA,sBAAA;EACA,qBAAA;EACA,+BAAA;ACZJ;;AD0BA;EACE,wBAAA;ACvBF;;AD0BA;EACE,iBAAA;EACA,oCAAA;EACA,iCAAA;EAEA,aAAA;EACA,kEACE;ACzBJ;;AD8BA;EACE,yEAAA;AC3BF;;AD8BA;EACE,qCAAA;AC3BF;;AD8BA;;;;;EAKE,yBAAA;AC3BF;;AC3EA,oBAAA;AACA;EACE,kBAAA;EACA,aAAA;EACA,wCAAA;EACA,yCAAA;AD8EF;AC5EE;EACE,wBAAA;EACA,gBAAA;EACA,mBAAA;AD8EJ;;AC1EA,gBAAA;AACA;EACE,oBAAA;AD6EF;AC5EE;EACE,gCAAA;EACA,WAAA;AD8EJ;AC3EE;EACE,aAAA;EACA,mBAAA;EACA,SAAA;AD6EJ;AC3EI;EACE,gBAAA;AD6EN;AC1EI;EACE,WAAA;AD4EN;ACxEE;EACE,gBAAA;AD0EJ;ACxEI;EACE,aAAA;EACA,mBAAA;EACA,SAAA;EACA,mBAAA;EACA,eAAA;EACA,0BAAA;AD0EN;ACxEM;EACE,yBAAA;AD0ER;ACvEM;EACE,gBAAA;ADyER;ACpEE;EF7CA,aAAA;EACA,uBAAA;EACA,mBAAA;EE6CE,SAAA;EFrDF,YAAA;EACA,6BAAA;EACA,eAAA;EEsDE,kBAAA;EACA,iBAAA;EACA,mBAAA;EAEA,iCAAA;ADwEJ;ACtEI;EACE,WAAA;EACA,sCAAA;EACA,mBAAA;ADwEN;ACrEI;EACE,gBAAA;ADuEN;ACpEI;EACE,oCAAA;ADsEN;;ACjEA,mBAAA;AACA;EFzEE,aAAA;EACA,uBAAA;EACA,mBAAA;EEyEA,sBAAA;EACA,SAAA;ADsEF;ACpEE;EACE,8BAAA;ADsEJ;ACnEE;EFlFA,aAAA;EACA,uBAAA;EACA,mBAAA;EEkFE,SAAA;ADuEJ;ACtEI;EACE,WAAA;ADwEN;ACpEE;EF1FA,aAAA;EACA,uBAAA;EACA,mBAAA;EE0FE,QAAA;EACA,kBAAA;EAEA,6CAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,iCAAA;ADuEJ;ACrEI;EACE,WAAA;ADuEN;ACpEI;EACE,gBAAA;ADsEN;ACnEI;EACE,mDAAA;ADqEN;ACjEE;EFlHA,aAAA;EACA,uBAAA;EACA,mBAAA;ACsLF;ACnEI;EFrHF,aAAA;EACA,uBAAA;EACA,mBAAA;EEqHI,QAAA;EAEA,qBAAA;EACA,yBAAA;ADsEN;ACnEI;EACE,WAAA;ADqEN;;AChEA,+BAAA;AACA,2CAAA;AACA;EACE,kBAAA;EACA,qBAAA;EACA,WAAA;EACA,eAAA;ADmEF;;AChEA,+BAAA;AACA;EACE,UAAA;EACA,QAAA;EACA,SAAA;ADmEF;;AChEA,eAAA;AACA;EACE,kBAAA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,sCAAA;EACA,qBAAA;EACA,wBAAA;EACA,gBAAA;ADmEF;;AChEA;EACE,kBAAA;EACA,WAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;EACA,aAAA;EACA,WAAA;EACA,uBAAA;EACA,wBAAA;EACA,gBAAA;ADmEF;;AChEA;EACE,mCAAA;ADmEF;;AChEA;EACE,qCAAA;ADmEF;;AChEA;EACE,uCAAA;EACA,mCAAA;EACA,+BAAA;ADmEF;;AExQA;EACE,iBAAA;EACA,wCAAA;EACA,0CAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,iBAAA;AF2QF;AEzQE;EACE,gBAAA;AF2QJ;AEzQE;EACE,6CAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,iCAAA;AF2QJ;AEzQI;EACE,mDAAA;AF2QN;AExQE;EACE,WAAA;EAEA,8BAAA;AFyQJ;;AErQA;EACE,aAAA;EACA,SAAA;AFwQF;AEtQE;EHvBA,aAAA;EACA,uBAAA;EACA,mBAAA;EGwBE,+CAAA;EACA,iBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,iCAAA;AFyQJ;AEvQI;EACE,qDAAA;AFyQN;AErQE;EACE,6CAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,iCAAA;AFuQJ;AErQI;EACE,mDAAA;AFuQN;;AGnUA;EACE,oCAAA;AHsUF;;AGpUA;EACE,eAAA;EACA,QAAA;EACA,SAAA;EACA,yCAAA;EACA,WAAA;EAEA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,wCAAA;AHsUF;;AGnUA;EACE,yCAAA;AHsUF;;AGnUA;EACE,mBAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;AHsUF;AGpUE;EACE,gBAAA;EACA,iBAAA;AHsUJ;AGnUE;EACE,wDAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,iCAAA;AHqUJ;AGnUI;EACE,WAAA;EACA,8BAAA;AHqUN;AGlUI;EACE,8DAAA;AHoUN;;AG/TA;EACE,aAAA;EACA,0BAAA;EAEA,gBAAA;AHiUF;AG/TE;EACE,kBAAA;EACA,gBAAA;AHiUJ;AG/TE;;;EAGE,aAAA;EACA,kBAAA;EACA,mCAAA;EACA,mBAAA;EACA,gBAAA;AHiUJ;;AG7TA;EACE,aAAA;EACA,YAAA;EACA,eAAA;EACA,sCAAA;AHgUF;;AG7TA;EACE,aAAA;EACA,gBAAA;EACA,iBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,+CAAA;EACA,yBAAA;EACA,iCAAA;AHgUF;;AG7TA;EACE,qDAAA;AHgUF;;AG7TA;EACE,eAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,cAAA;EACA,eAAA;EACA,oCAAA;EACA,oBAAA;EACA,UAAA;AHgUF;;AG7TA;EACE,cAAA;EACA,mBAAA;AHgUF;;AG7TA;EACE,uBAAA;EACA,kBAAA;AHgUF;AG/TE;EACE,WAAA;AHiUJ;AG/TE;EACE,wBAAA;EACA,gBAAA;AHiUJ;AG/TE;EACE,gBAAA;AHiUJ;AG/TE;EACE,wBAAA;EACA,gBAAA;EACA,mBAAA;AHiUJ;AG/TE;EACE,YAAA;EACA,6CAAA;EACA,iBAAA;EACA,mBAAA;EACA,gBAAA;EACA,mBAAA;AHiUJ;AG/TE;EACE,YAAA;EACA,aAAA;EACA,QAAA;EACA,gBAAA;EACA,6CAAA;EACA,iBAAA;EACA,mBAAA;EACA,mBAAA;AHiUJ;AG/TI;EACE,WAAA;AHiUN;AG9TI;EACE,8BAAA;AHgUN;AG9TI;EACE,6HAAA;AHgUN;AG7TI;EACE,6HAAA;AH+TN;AG3TE;EACE,aAAA;EACA,SAAA;AH6TJ;AG5TI;EACE,YAAA;EACA,+CAAA;EACA,eAAA;EACA,iCAAA;AH8TN;AG5TM;EACE,qDAAA;AH8TR;AG1TI;EACE,mBAAA;EACA,iBAAA;EACA,gBAAA;AH4TN;AG1TI;;EAEE,YAAA;EACA,kBAAA;EACA,kBAAA;AH4TN;AG1TM;;EACE,8BAAA;EACA,WAAA;AH6TR;;AI9fA;EACE,eAAA;EACA,kBAAA;AJigBF;;AI7fE;EACE,aAAA;EACA,4DAAA;EACA,SAAA;AJggBJ;AI7fE;EACE,mBAAA;EACA,iBAAA;EACA,wBAAA;AJ+fJ;AI5fE;EACE,aAAA;EACA,sBAAA;EACA,SAAA;EACA,gBAAA;AJ8fJ;AI5fI;EACE,gBAAA;AJ8fN;AI3fI;EACE,wCAAA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;EAEA,eAAA;EACA,2CAAA;EACA,2CAAA;AJ4fN;AI1fM;EACE,2BAAA;EACA,4CAAA;AJ4fR;AIzfM;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,gBAAA;AJ2fR;AIzfQ;EACE,aAAA;EACA,QAAA;EAEA,6CAAA;EACA,gBAAA;EACA,mBAAA;AJ0fV;AIxfU;EACE,WAAA;AJ0fZ;AIvfQ;EACE,wBAAA;AJyfV;AItfQ;EACE,8BAAA;AJwfV;AItfQ;EACE,6HAAA;AJwfV;AIrfQ;EACE,6HAAA;AJufV;;AI/eA;EACE,WAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,sCAAA;EACA,qBAAA;EACA,iBAAA;AJkfF;;AI/eA;EACE,WAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,yBAAA;EACA,qBAAA;EACA,iBAAA;AJkfF;;AKrlBA;EACE,aAAA;EACA,oBAAA;ALwlBF;;AKrlBA;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,SAAA;EACA,mBAAA;ALwlBF;AKtlBE;EACE,gBAAA;EACA,mBAAA;EACA,WAAA;ALwlBJ;AKrlBE;EACE,iBAAA;EACA,mBAAA;EACA,YAAA;EACA,+CAAA;EACA,gBAAA;EACA,eAAA;EACA,iCAAA;ALulBJ;AKrlBI;EACE,qDAAA;ALulBN;;AKllBA;EACE,WAAA;EACA,mCAAA;EACA,UAAA;ALqlBF;;AKllBA;EACE,iBAAA;EACA,wBAAA;EACA,uEAAA;EACA,SAAA;ALqlBF;AKnlBE;EACE,sBAAA;ALqlBJ;;AMroBA;EACE;IACE,aAAA;IACA,sBAAA;IACA,kBAAA;IACA,uBAAA;ENwoBF;EMpoBI;IACE,aAAA;ENsoBN;EMjoBA;IACE,SAAA;IACA,uBAAA;ENmoBF;EMjoBE;IACE,aAAA;ENmoBJ;EMjoBE;IACE,cAAA;ENmoBJ;EMjoBE;IACE,gBAAA;ENmoBJ;EM/nBA;IACE,YAAA;ENioBF;EMhoBE;IACE,qBAAA;ENkoBJ;AACF;AM9nBA;EAEI;IACE,uBAAA;EN+nBJ;AACF","sourcesContent":["/* common reused styles */\r\n\r\n@mixin icon-size($pixel) {\r\n  height: $pixel;\r\n  width: $pixel;\r\n}\r\n\r\n@mixin button-styling {\r\n  border: none;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n}\r\n\r\n@mixin flex-center {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap\");\r\n\r\n/* CSS Reset */\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\nhtml {\r\n  color-scheme: dark light;\r\n}\r\n\r\nimg,\r\npicture,\r\nsvg,\r\nvideo {\r\n  display: block;\r\n  max-width: 100%;\r\n}\r\n\r\n/* Custom CSS */\r\n\r\n:root {\r\n  --primary-color: #38bdf8;\r\n  --secondary-color: #334155;\r\n  --third-color: #1e293b;\r\n  --white-color: #fafafa;\r\n  --gray-color: #94a3b8;\r\n\r\n  &.light {\r\n    --primary-color: #38bdf8;\r\n    --secondary-color: #7497c9;\r\n    --third-color: #5372a3;\r\n    --gray-color: #abbfda;\r\n    --primary-button-color: #6c84a4;\r\n  }\r\n\r\n  --primary-color-svg: brightness(0) saturate(100%) invert(60%) sepia(16%)\r\n    saturate(2562%) hue-rotate(169deg) brightness(107%) contrast(95%);\r\n  --white-color-svg: brightness(0) saturate(100%) invert(100%) sepia(0%)\r\n    saturate(0%) hue-rotate(14deg) brightness(105%) contrast(96%);\r\n\r\n  --primary-button-color: #475569;\r\n  --primary-button-hover-color: #53657d;\r\n  --secondary-button-color: #38bdf8;\r\n  --secondary-button-hover-color: #7dd3fc;\r\n}\r\n\r\n.not-active {\r\n  display: none !important;\r\n}\r\n\r\n.content {\r\n  min-height: 100vh;\r\n  background-color: var(--third-color);\r\n  font-family: \"Roboto\", sans-serif;\r\n\r\n  display: grid;\r\n  grid-template:\r\n    \"sidebar header\" 100px\r\n    \"sidebar main\" 1fr\r\n    / 300px 1fr;\r\n}\r\n\r\n.hide-sidebar {\r\n  grid-template: \"header header\" 100px \"main main\" 1fr / 300px 1fr !important;\r\n}\r\n\r\nh1 {\r\n  font-family: \"Montserrat\", sans-serif;\r\n}\r\n\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\np {\r\n  color: var(--white-color);\r\n}\r\n","/* common reused styles */\n@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap\");\n/* CSS Reset */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font: inherit;\n}\n\nhtml {\n  color-scheme: dark light;\n}\n\nimg,\npicture,\nsvg,\nvideo {\n  display: block;\n  max-width: 100%;\n}\n\n/* Custom CSS */\n:root {\n  --primary-color: #38bdf8;\n  --secondary-color: #334155;\n  --third-color: #1e293b;\n  --white-color: #fafafa;\n  --gray-color: #94a3b8;\n  --primary-color-svg: brightness(0) saturate(100%) invert(60%) sepia(16%)\n    saturate(2562%) hue-rotate(169deg) brightness(107%) contrast(95%);\n  --white-color-svg: brightness(0) saturate(100%) invert(100%) sepia(0%)\n    saturate(0%) hue-rotate(14deg) brightness(105%) contrast(96%);\n  --primary-button-color: #475569;\n  --primary-button-hover-color: #53657d;\n  --secondary-button-color: #38bdf8;\n  --secondary-button-hover-color: #7dd3fc;\n}\n:root.light {\n  --primary-color: #38bdf8;\n  --secondary-color: #7497c9;\n  --third-color: #5372a3;\n  --gray-color: #abbfda;\n  --primary-button-color: #6c84a4;\n}\n\n.not-active {\n  display: none !important;\n}\n\n.content {\n  min-height: 100vh;\n  background-color: var(--third-color);\n  font-family: \"Roboto\", sans-serif;\n  display: grid;\n  grid-template: \"sidebar header\" 100px \"sidebar main\" 1fr/300px 1fr;\n}\n\n.hide-sidebar {\n  grid-template: \"header header\" 100px \"main main\" 1fr/300px 1fr !important;\n}\n\nh1 {\n  font-family: \"Montserrat\", sans-serif;\n}\n\nh1,\nh2,\nh3,\nh4,\np {\n  color: var(--white-color);\n}\n\n/* Sidebar general */\n.sidebar {\n  grid-area: sidebar;\n  padding: 40px;\n  background-color: var(--secondary-color);\n  border-right: 1px solid var(--gray-color);\n}\n.sidebar h2 {\n  color: var(--gray-color);\n  margin-top: 30px;\n  margin-bottom: 20px;\n}\n\n/* Sidebar top */\n.sidebar-top {\n  margin-bottom: 100px;\n}\n.sidebar-top img {\n  filter: var(--primary-color-svg);\n  width: 22px;\n}\n.sidebar-top .banner {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.sidebar-top .banner h1 {\n  font-size: 2.1em;\n}\n.sidebar-top .banner img {\n  width: 34px;\n}\n.sidebar-top ul {\n  list-style: none;\n}\n.sidebar-top ul li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 20px;\n  cursor: pointer;\n  transition: transform 0.3s;\n}\n.sidebar-top ul li:hover {\n  transform: translate(5px);\n}\n.sidebar-top ul li p {\n  font-size: 1.1em;\n}\n.sidebar-top .create-project {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  padding: 10px 20px;\n  margin-left: 10px;\n  border-radius: 10px;\n  transition: background-color 0.3s;\n}\n.sidebar-top .create-project img {\n  width: 18px;\n  border: 2px solid var(--primary-color);\n  border-radius: 100%;\n}\n.sidebar-top .create-project p {\n  font-size: 0.8em;\n}\n.sidebar-top .create-project:hover {\n  background-color: rgba(0, 0, 0, 0.3);\n}\n\n/* Sidebar bottom */\n.sidebar-bottom {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  gap: 30px;\n}\n.sidebar-bottom img {\n  filter: var(--white-color-svg);\n}\n.sidebar-bottom .light-dark-mode {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n.sidebar-bottom .light-dark-mode img {\n  width: 25px;\n}\n.sidebar-bottom .collapse {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  padding: 10px 20px;\n  background-color: var(--primary-button-color);\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.sidebar-bottom .collapse img {\n  width: 20px;\n}\n.sidebar-bottom .collapse p {\n  font-size: 0.9em;\n}\n.sidebar-bottom .collapse:hover {\n  background-color: var(--primary-button-hover-color);\n}\n.sidebar-bottom footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.sidebar-bottom footer a {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  text-decoration: none;\n  color: var(--white-color);\n}\n.sidebar-bottom footer img {\n  width: 20px;\n}\n\n/* light and dark mode switch */\n/* The switch - the box around the slider */\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 42px;\n  height: 24.33px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--primary-color);\n  border-radius: 23.3px;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 16.66px;\n  width: 16.66px;\n  border-radius: 50%;\n  left: 20.66px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: var(--gray-color);\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px var(--gray-color);\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(-16.66px);\n  -ms-transform: translateX(-16.66px);\n  transform: translateX(-16.66px);\n}\n\nheader {\n  grid-area: header;\n  background-color: var(--secondary-color);\n  border-bottom: 1px solid var(--gray-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0px 40px;\n}\nheader h2 {\n  font-size: 1.8em;\n}\nheader .hamburger-menu {\n  background-color: var(--primary-button-color);\n  border-radius: 100%;\n  padding: 10px;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\nheader .hamburger-menu:hover {\n  background-color: var(--primary-button-hover-color);\n}\nheader img {\n  width: 25px;\n  filter: var(--white-color-svg);\n}\n\n.header-right {\n  display: flex;\n  gap: 20px;\n}\n.header-right .add-task-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--secondary-button-color);\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.header-right .add-task-button:hover {\n  background-color: var(--secondary-button-hover-color);\n}\n.header-right .edit-project-button {\n  background-color: var(--primary-button-color);\n  border-radius: 100%;\n  padding: 10px;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.header-right .edit-project-button:hover {\n  background-color: var(--primary-button-hover-color);\n}\n\nlabel {\n  color: var(--white-color) !important;\n}\n\n.popup {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  z-index: 10;\n  width: 400px;\n  padding: 20px;\n  border-radius: 10px;\n  background-color: var(--secondary-color);\n}\n\n.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.popup-header {\n  margin-bottom: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.popup-header h2 {\n  font-size: 1.2em;\n  font-weight: bold;\n}\n.popup-header button {\n  background-color: var(--primary-button-color) !important;\n  padding: 5px;\n  border: none;\n  cursor: pointer;\n  border-radius: 100%;\n  transition: background-color 0.3s;\n}\n.popup-header button img {\n  width: 15px;\n  filter: var(--white-color-svg);\n}\n.popup-header button:hover {\n  background-color: var(--primary-button-hover-color) !important;\n}\n\nform {\n  display: grid;\n  grid-template-columns: 1fr;\n  padding: 0px 6px;\n}\nform label {\n  margin-bottom: 8px;\n  font-size: 0.9em;\n}\nform input,\nform textarea,\nform select {\n  padding: 10px;\n  border-radius: 5px;\n  border: 1px solid var(--gray-color);\n  margin-bottom: 20px;\n  font-size: 0.9em;\n}\n\ninput:focus {\n  outline: none;\n  padding: 9px;\n  cursor: pointer;\n  border: 2px solid var(--primary-color);\n}\n\ninput[type=submit] {\n  padding: 10px;\n  font-size: 1.1em;\n  font-weight: bold;\n  border-radius: 20px;\n  border: none;\n  cursor: pointer;\n  background-color: var(--secondary-button-color);\n  color: var(--white-color);\n  transition: background-color 0.3s;\n}\n\ninput[type=submit]:hover {\n  background-color: var(--secondary-button-hover-color);\n}\n\n.overlay {\n  position: fixed;\n  display: none;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  width: 10000px;\n  height: 10000px;\n  background-color: rgba(0, 0, 0, 0.5);\n  pointer-events: none;\n  z-index: 9;\n}\n\n.overlay.active {\n  display: block;\n  pointer-events: all;\n}\n\n#opened-task {\n  width: 380px !important;\n  padding: 40px 30px;\n}\n#opened-task img {\n  width: 20px;\n}\n#opened-task #opened-task-status {\n  color: var(--gray-color);\n  font-size: 0.8em;\n}\n#opened-task #opened-task-title {\n  font-size: 1.4em;\n}\n#opened-task #opened-task-description {\n  color: var(--gray-color);\n  margin-top: 15px;\n  margin-bottom: 20px;\n}\n#opened-task #opened-task-due {\n  width: 120px;\n  background-color: var(--primary-button-color);\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 0.9em;\n  margin-bottom: 10px;\n}\n#opened-task #opened-task-priority {\n  width: 120px;\n  display: flex;\n  gap: 4px;\n  font-size: 0.9em;\n  background-color: var(--primary-button-color);\n  padding: 6px 12px;\n  border-radius: 20px;\n  margin-bottom: 30px;\n}\n#opened-task #opened-task-priority img {\n  width: 14px;\n}\n#opened-task #opened-task-priority .low {\n  filter: var(--white-color-svg);\n}\n#opened-task #opened-task-priority .med {\n  filter: brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%);\n}\n#opened-task #opened-task-priority .high {\n  filter: brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(792%) hue-rotate(320deg) brightness(107%) contrast(109%);\n}\n#opened-task #opened-task-footer {\n  display: flex;\n  gap: 10px;\n}\n#opened-task #opened-task-footer > * {\n  border: none;\n  background-color: var(--secondary-button-color);\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n#opened-task #opened-task-footer > *:hover {\n  background-color: var(--secondary-button-hover-color);\n}\n#opened-task #opened-task-footer #opened-task-main {\n  border-radius: 24px;\n  padding: 0px 40px;\n  font-size: 1.2em;\n}\n#opened-task #opened-task-footer #opened-task-edit,\n#opened-task #opened-task-footer #opened-task-close {\n  padding: 8px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n#opened-task #opened-task-footer #opened-task-edit img,\n#opened-task #opened-task-footer #opened-task-close img {\n  filter: var(--white-color-svg);\n  width: 24px;\n}\n\nmain {\n  grid-area: main;\n  padding: 40px 80px;\n}\n\n#task-display .project-render-task {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n#task-display h3 {\n  margin-bottom: 20px;\n  font-weight: bold;\n  color: var(--gray-color);\n}\n#task-display ul {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n  list-style: none;\n}\n#task-display ul h4 {\n  font-size: 1.2em;\n}\n#task-display ul li {\n  background-color: var(--secondary-color);\n  padding: 15px 20px;\n  width: 280px;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  cursor: pointer;\n  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n#task-display ul li:hover {\n  transform: translateY(-3px);\n  box-shadow: rgba(0, 0, 0, 0.36) 0px 6px 16px;\n}\n#task-display ul li .task-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 0.8em;\n}\n#task-display ul li .task-footer .task-priority {\n  display: flex;\n  gap: 4px;\n  background-color: var(--primary-button-color);\n  padding: 4px 8px;\n  border-radius: 20px;\n}\n#task-display ul li .task-footer .task-priority img {\n  width: 14px;\n}\n#task-display ul li .task-footer .task-due-date {\n  color: var(--gray-color);\n}\n#task-display ul li .task-footer .low {\n  filter: var(--white-color-svg);\n}\n#task-display ul li .task-footer .med {\n  filter: brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%);\n}\n#task-display ul li .task-footer .high {\n  filter: brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(792%) hue-rotate(320deg) brightness(107%) contrast(109%);\n}\n\n#todo h3::before {\n  content: \"\";\n  width: 10px;\n  height: 10px;\n  border-radius: 100%;\n  background-color: var(--primary-color);\n  display: inline-block;\n  margin-right: 5px;\n}\n\n#done h3::before {\n  content: \"\";\n  width: 10px;\n  height: 10px;\n  border-radius: 100%;\n  background-color: #6ee7b7;\n  display: inline-block;\n  margin-right: 5px;\n}\n\n.date-container {\n  padding: 10px;\n  margin-bottom: 100px;\n}\n\n.date-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 50px;\n  margin-bottom: 40px;\n}\n.date-header h3 {\n  font-size: 1.3em;\n  white-space: nowrap;\n  height: 5px;\n}\n.date-header button {\n  padding: 7px 17px;\n  border-radius: 17px;\n  border: none;\n  background-color: var(--secondary-button-color);\n  font-size: 0.8em;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.date-header button:hover {\n  background-color: var(--secondary-button-hover-color);\n}\n\n.hr {\n  height: 1px;\n  background-color: var(--gray-color);\n  flex: auto;\n}\n\n.date-tasks {\n  padding: 0px 30px;\n  display: grid !important;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;\n  gap: 20px;\n}\n.date-tasks li {\n  width: 100% !important;\n}\n\n@media (max-width: 800px) {\n  header {\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    justify-content: center;\n  }\n  .header-right .add-task-button p {\n    display: none;\n  }\n  .date-header {\n    gap: 20px;\n    justify-content: center;\n  }\n  .date-header .hr {\n    display: none;\n  }\n  .date-header h3 {\n    font-size: 1em;\n  }\n  .date-header button {\n    font-size: 0.6em;\n  }\n  .date-tasks {\n    width: 100px;\n  }\n  .date-tasks li {\n    width: 60% !important;\n  }\n}\n@media (max-width: 500px) {\n  #task-display li {\n    width: 250px !important;\n  }\n}","@use \"index\";\r\n\r\n/* Sidebar general */\r\n.sidebar {\r\n  grid-area: sidebar;\r\n  padding: 40px;\r\n  background-color: var(--secondary-color);\r\n  border-right: 1px solid var(--gray-color);\r\n\r\n  h2 {\r\n    color: var(--gray-color);\r\n    margin-top: 30px;\r\n    margin-bottom: 20px;\r\n  }\r\n}\r\n\r\n/* Sidebar top */\r\n.sidebar-top {\r\n  margin-bottom: 100px;\r\n  img {\r\n    filter: var(--primary-color-svg);\r\n    width: 22px;\r\n  }\r\n\r\n  .banner {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n\r\n    h1 {\r\n      font-size: 2.1em;\r\n    }\r\n\r\n    img {\r\n      width: 34px;\r\n    }\r\n  }\r\n\r\n  ul {\r\n    list-style: none;\r\n\r\n    li {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n      margin-bottom: 20px;\r\n      cursor: pointer;\r\n      transition: transform 0.3s;\r\n\r\n      &:hover {\r\n        transform: translate(5px);\r\n      }\r\n\r\n      p {\r\n        font-size: 1.1em;\r\n      }\r\n    }\r\n  }\r\n\r\n  .create-project {\r\n    @include index.flex-center;\r\n    gap: 10px;\r\n    @include index.button-styling;\r\n\r\n    padding: 10px 20px;\r\n    margin-left: 10px;\r\n    border-radius: 10px;\r\n\r\n    transition: background-color 0.3s;\r\n\r\n    img {\r\n      width: 18px;\r\n      border: 2px solid var(--primary-color);\r\n      border-radius: 100%;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.8em;\r\n    }\r\n\r\n    &:hover {\r\n      background-color: rgba(0, 0, 0, 0.3);\r\n    }\r\n  }\r\n}\r\n\r\n/* Sidebar bottom */\r\n.sidebar-bottom {\r\n  @include index.flex-center;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n\r\n  img {\r\n    filter: var(--white-color-svg);\r\n  }\r\n\r\n  .light-dark-mode {\r\n    @include index.flex-center;\r\n    gap: 15px;\r\n    img {\r\n      width: 25px;\r\n    }\r\n  }\r\n\r\n  .collapse {\r\n    @include index.flex-center;\r\n    gap: 5px;\r\n    padding: 10px 20px;\r\n\r\n    background-color: var(--primary-button-color);\r\n    border-radius: 10px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s;\r\n\r\n    img {\r\n      width: 20px;\r\n    }\r\n\r\n    p {\r\n      font-size: 0.9em;\r\n    }\r\n\r\n    &:hover {\r\n      background-color: var(--primary-button-hover-color);\r\n    }\r\n  }\r\n\r\n  footer {\r\n    @include index.flex-center;\r\n\r\n    a {\r\n      @include index.flex-center;\r\n      gap: 5px;\r\n\r\n      text-decoration: none;\r\n      color: var(--white-color);\r\n    }\r\n\r\n    img {\r\n      width: 20px;\r\n    }\r\n  }\r\n}\r\n\r\n/* light and dark mode switch */\r\n/* The switch - the box around the slider */\r\n.switch {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 42px;\r\n  height: 24.33px;\r\n}\r\n\r\n/* Hide default HTML checkbox */\r\n.switch input {\r\n  opacity: 0;\r\n  width: 0;\r\n  height: 0;\r\n}\r\n\r\n/* The slider */\r\n.slider {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: var(--primary-color);\r\n  border-radius: 23.3px;\r\n  -webkit-transition: 0.4s;\r\n  transition: 0.4s;\r\n}\r\n\r\n.slider:before {\r\n  position: absolute;\r\n  content: \"\";\r\n  height: 16.66px;\r\n  width: 16.66px;\r\n  border-radius: 50%;\r\n  left: 20.66px;\r\n  bottom: 4px;\r\n  background-color: white;\r\n  -webkit-transition: 0.4s;\r\n  transition: 0.4s;\r\n}\r\n\r\ninput:checked + .slider {\r\n  background-color: var(--gray-color);\r\n}\r\n\r\ninput:focus + .slider {\r\n  box-shadow: 0 0 1px var(--gray-color);\r\n}\r\n\r\ninput:checked + .slider:before {\r\n  -webkit-transform: translateX(-16.66px);\r\n  -ms-transform: translateX(-16.66px);\r\n  transform: translateX(-16.66px);\r\n}\r\n","@use \"index\";\r\n\r\nheader {\r\n  grid-area: header;\r\n  background-color: var(--secondary-color);\r\n  border-bottom: 1px solid var(--gray-color);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 0px 40px;\r\n\r\n  h2 {\r\n    font-size: 1.8em;\r\n  }\r\n  .hamburger-menu {\r\n    background-color: var(--primary-button-color);\r\n    border-radius: 100%;\r\n    padding: 10px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s;\r\n\r\n    &:hover {\r\n      background-color: var(--primary-button-hover-color);\r\n    }\r\n  }\r\n  img {\r\n    width: 25px;\r\n\r\n    filter: var(--white-color-svg);\r\n  }\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  gap: 20px;\r\n\r\n  .add-task-button {\r\n    @include index.flex-center;\r\n\r\n    background-color: var(--secondary-button-color);\r\n    padding: 8px 16px;\r\n    border-radius: 20px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: background-color 0.2s;\r\n\r\n    &:hover {\r\n      background-color: var(--secondary-button-hover-color);\r\n    }\r\n  }\r\n\r\n  .edit-project-button {\r\n    background-color: var(--primary-button-color);\r\n    border-radius: 100%;\r\n    padding: 10px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s;\r\n\r\n    &:hover {\r\n      background-color: var(--primary-button-hover-color);\r\n    }\r\n  }\r\n}\r\n","@use \"index\";\r\nlabel {\r\n  color: var(--white-color) !important;\r\n}\r\n.popup {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%) scale(0);\r\n  z-index: 10;\r\n\r\n  width: 400px;\r\n  padding: 20px;\r\n  border-radius: 10px;\r\n  background-color: var(--secondary-color);\r\n}\r\n\r\n.active {\r\n  transform: translate(-50%, -50%) scale(1);\r\n}\r\n\r\n.popup-header {\r\n  margin-bottom: 16px;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n\r\n  h2 {\r\n    font-size: 1.2em;\r\n    font-weight: bold;\r\n  }\r\n\r\n  button {\r\n    background-color: var(--primary-button-color) !important;\r\n    padding: 5px;\r\n    border: none;\r\n    cursor: pointer;\r\n    border-radius: 100%;\r\n    transition: background-color 0.3s;\r\n\r\n    img {\r\n      width: 15px;\r\n      filter: var(--white-color-svg);\r\n    }\r\n\r\n    &:hover {\r\n      background-color: var(--primary-button-hover-color) !important;\r\n    }\r\n  }\r\n}\r\n\r\nform {\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n\r\n  padding: 0px 6px;\r\n\r\n  label {\r\n    margin-bottom: 8px;\r\n    font-size: 0.9em;\r\n  }\r\n  input,\r\n  textarea,\r\n  select {\r\n    padding: 10px;\r\n    border-radius: 5px;\r\n    border: 1px solid var(--gray-color);\r\n    margin-bottom: 20px;\r\n    font-size: 0.9em;\r\n  }\r\n}\r\n\r\ninput:focus {\r\n  outline: none;\r\n  padding: 9px;\r\n  cursor: pointer;\r\n  border: 2px solid var(--primary-color);\r\n}\r\n\r\ninput[type=\"submit\"] {\r\n  padding: 10px;\r\n  font-size: 1.1em;\r\n  font-weight: bold;\r\n  border-radius: 20px;\r\n  border: none;\r\n  cursor: pointer;\r\n  background-color: var(--secondary-button-color);\r\n  color: var(--white-color);\r\n  transition: background-color 0.3s;\r\n}\r\n\r\ninput[type=\"submit\"]:hover {\r\n  background-color: var(--secondary-button-hover-color);\r\n}\r\n\r\n.overlay {\r\n  position: fixed;\r\n  display: none;\r\n  top: 0px;\r\n  left: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  width: 10000px;\r\n  height: 10000px;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  pointer-events: none;\r\n  z-index: 9;\r\n}\r\n\r\n.overlay.active {\r\n  display: block;\r\n  pointer-events: all;\r\n}\r\n\r\n#opened-task {\r\n  width: 380px !important;\r\n  padding: 40px 30px;\r\n  img {\r\n    width: 20px;\r\n  }\r\n  #opened-task-status {\r\n    color: var(--gray-color);\r\n    font-size: 0.8em;\r\n  }\r\n  #opened-task-title {\r\n    font-size: 1.4em;\r\n  }\r\n  #opened-task-description {\r\n    color: var(--gray-color);\r\n    margin-top: 15px;\r\n    margin-bottom: 20px;\r\n  }\r\n  #opened-task-due {\r\n    width: 120px;\r\n    background-color: var(--primary-button-color);\r\n    padding: 6px 12px;\r\n    border-radius: 20px;\r\n    font-size: 0.9em;\r\n    margin-bottom: 10px;\r\n  }\r\n  #opened-task-priority {\r\n    width: 120px;\r\n    display: flex;\r\n    gap: 4px;\r\n    font-size: 0.9em;\r\n    background-color: var(--primary-button-color);\r\n    padding: 6px 12px;\r\n    border-radius: 20px;\r\n    margin-bottom: 30px;\r\n\r\n    img {\r\n      width: 14px;\r\n    }\r\n\r\n    .low {\r\n      filter: var(--white-color-svg);\r\n    }\r\n    .med {\r\n      filter: brightness(0) saturate(100%) invert(55%) sepia(96%)\r\n        saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%); //orange\r\n    }\r\n    .high {\r\n      filter: brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(792%)\r\n        hue-rotate(320deg) brightness(107%) contrast(109%); //red\r\n    }\r\n  }\r\n  #opened-task-footer {\r\n    display: flex;\r\n    gap: 10px;\r\n    & > * {\r\n      border: none;\r\n      background-color: var(--secondary-button-color);\r\n      cursor: pointer;\r\n      transition: background-color 0.3s;\r\n\r\n      &:hover {\r\n        background-color: var(--secondary-button-hover-color);\r\n      }\r\n    }\r\n\r\n    #opened-task-main {\r\n      border-radius: 24px;\r\n      padding: 0px 40px;\r\n      font-size: 1.2em;\r\n    }\r\n    #opened-task-edit,\r\n    #opened-task-close {\r\n      padding: 8px;\r\n      border-radius: 50%;\r\n      margin-right: 10px;\r\n\r\n      img {\r\n        filter: var(--white-color-svg);\r\n        width: 24px;\r\n      }\r\n    }\r\n  }\r\n}\r\n","main {\r\n  grid-area: main;\r\n  padding: 40px 80px;\r\n}\r\n\r\n#task-display {\r\n  .project-render-task {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\r\n    gap: 20px;\r\n  }\r\n\r\n  h3 {\r\n    margin-bottom: 20px;\r\n    font-weight: bold;\r\n    color: var(--gray-color);\r\n  }\r\n\r\n  ul {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 30px;\r\n    list-style: none;\r\n\r\n    h4 {\r\n      font-size: 1.2em;\r\n    }\r\n\r\n    li {\r\n      background-color: var(--secondary-color);\r\n      padding: 15px 20px;\r\n      width: 280px;\r\n      border-radius: 8px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 20px;\r\n\r\n      cursor: pointer;\r\n      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\r\n      transition: transform 0.3s, box-shadow 0.3s;\r\n\r\n      &:hover {\r\n        transform: translateY(-3px);\r\n        box-shadow: rgba(0, 0, 0, 0.36) 0px 6px 16px;\r\n      }\r\n\r\n      .task-footer {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n        font-size: 0.8em;\r\n\r\n        .task-priority {\r\n          display: flex;\r\n          gap: 4px;\r\n\r\n          background-color: var(--primary-button-color);\r\n          padding: 4px 8px;\r\n          border-radius: 20px;\r\n\r\n          img {\r\n            width: 14px;\r\n          }\r\n        }\r\n        .task-due-date {\r\n          color: var(--gray-color);\r\n        }\r\n\r\n        .low {\r\n          filter: var(--white-color-svg);\r\n        }\r\n        .med {\r\n          filter: brightness(0) saturate(100%) invert(55%) sepia(96%)\r\n            saturate(2343%) hue-rotate(348deg) brightness(97%) contrast(102%); //orange\r\n        }\r\n        .high {\r\n          filter: brightness(0) saturate(100%) invert(32%) sepia(83%)\r\n            saturate(792%) hue-rotate(320deg) brightness(107%) contrast(109%); //red\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n#todo h3::before {\r\n  content: \"\";\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 100%;\r\n  background-color: var(--primary-color);\r\n  display: inline-block;\r\n  margin-right: 5px;\r\n}\r\n\r\n#done h3::before {\r\n  content: \"\";\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 100%;\r\n  background-color: #6ee7b7;\r\n  display: inline-block;\r\n  margin-right: 5px;\r\n}\r\n","@use \"index\";\r\n\r\n.date-container {\r\n  padding: 10px;\r\n  margin-bottom: 100px;\r\n}\r\n\r\n.date-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 50px;\r\n  margin-bottom: 40px;\r\n\r\n  h3 {\r\n    font-size: 1.3em;\r\n    white-space: nowrap;\r\n    height: 5px;\r\n  }\r\n\r\n  button {\r\n    padding: 7px 17px;\r\n    border-radius: 17px;\r\n    border: none;\r\n    background-color: var(--secondary-button-color);\r\n    font-size: 0.8em;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s;\r\n\r\n    &:hover {\r\n      background-color: var(--secondary-button-hover-color);\r\n    }\r\n  }\r\n}\r\n\r\n.hr {\r\n  height: 1px;\r\n  background-color: var(--gray-color);\r\n  flex: auto;\r\n}\r\n\r\n.date-tasks {\r\n  padding: 0px 30px;\r\n  display: grid !important;\r\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;\r\n  gap: 20px;\r\n\r\n  li {\r\n    width: 100% !important;\r\n  }\r\n}\r\n","@media (max-width: 800px) {\r\n  header {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: start;\r\n    justify-content: center;\r\n  }\r\n  .header-right {\r\n    .add-task-button {\r\n      p {\r\n        display: none;\r\n      }\r\n    }\r\n  }\r\n\r\n  .date-header {\r\n    gap: 20px;\r\n    justify-content: center;\r\n\r\n    .hr {\r\n      display: none;\r\n    }\r\n    h3 {\r\n      font-size: 1em;\r\n    }\r\n    button {\r\n      font-size: 0.6em;\r\n    }\r\n  }\r\n\r\n  .date-tasks {\r\n    width: 100px;\r\n    li {\r\n      width: 60% !important;\r\n    }\r\n  }\r\n}\r\n\r\n@media (max-width: 500px) {\r\n  #task-display {\r\n    li {\r\n      width: 250px !important;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/addDays/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addDays)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week (and month and year)
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft, options);
  var dateRightStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameWeek/index.js */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */

function isThisWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isToday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isToday/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameDay/index.js */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now());
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/subDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/subDays/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subDays)
/* harmony export */ });
/* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addDays/index.js */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyAmount);
  return (0,_addDays_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, -amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/template.html":
/*!***************************!*\
  !*** ./src/template.html ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/stack-of-sheets.svg */ "./src/assets/images/stack-of-sheets.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/day.svg */ "./src/assets/images/day.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/week.svg */ "./src/assets/images/week.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/all.svg */ "./src/assets/images/all.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/plus.svg */ "./src/assets/images/plus.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/sun.svg */ "./src/assets/images/sun.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/moon.svg */ "./src/assets/images/moon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/hide_arrow.svg */ "./src/assets/images/hide_arrow.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/github.svg */ "./src/assets/images/github.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/edit.svg */ "./src/assets/images/edit.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/hamburger.svg */ "./src/assets/images/hamburger.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/close.svg */ "./src/assets/images/close.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/trash.svg */ "./src/assets/images/trash.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/flag.svg */ "./src/assets/images/flag.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var ___HTML_LOADER_REPLACEMENT_6___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_6___);
var ___HTML_LOADER_REPLACEMENT_7___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_7___);
var ___HTML_LOADER_REPLACEMENT_8___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_8___);
var ___HTML_LOADER_REPLACEMENT_9___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_9___);
var ___HTML_LOADER_REPLACEMENT_10___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_10___);
var ___HTML_LOADER_REPLACEMENT_11___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_11___);
var ___HTML_LOADER_REPLACEMENT_12___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_12___);
var ___HTML_LOADER_REPLACEMENT_13___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_13___);
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>TaskStack</title>\r\n  </head>\r\n  <body>\r\n    <section class=\"content\">\r\n      <section class=\"sidebar\">\r\n        <div class=\"sidebar-top\">\r\n          <div class=\"banner\">\r\n            <img\r\n              src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\r\n              alt=\"stack-of-sheets\"\r\n            />\r\n            <h1>TaskStack</h1>\r\n          </div>\r\n          <div class=\"due\">\r\n            <h2>DUE</h2>\r\n            <ul>\r\n              <li id=\"today-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"today\" />\r\n                <p>Today</p>\r\n              </li>\r\n              <li id=\"week-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"week\" />\r\n                <p>This Week</p>\r\n              </li>\r\n              <li id=\"all-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"all-time\" />\r\n                <p>All Time</p>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n          <div class=\"projects\">\r\n            <h2 class=\"projects-title\"></h2>\r\n            <ul class=\"projects-list\"></ul>\r\n            <button class=\"create-project\">\r\n              <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"plus\" />\r\n              <p>CREATE PROJECT</p>\r\n            </button>\r\n          </div>\r\n        </div>\r\n        <div class=\"sidebar-bottom\">\r\n          <div class=\"light-dark-mode\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"day\" />\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" />\r\n              <span class=\"slider\"></span>\r\n            </label>\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"moon\" />\r\n          </div>\r\n          <div class=\"collapse\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_7___ + "\" alt=\"arrow\" />\r\n            <p>COLLAPSE</p>\r\n          </div>\r\n          <footer>\r\n            <a href=\"https://github.com/Berget1411\">\r\n              <p>Made by Berget</p>\r\n              <img src=\"" + ___HTML_LOADER_REPLACEMENT_8___ + "\" alt=\"github-icon\" />\r\n            </a>\r\n          </footer>\r\n        </div>\r\n      </section>\r\n      <header>\r\n        <div class=\"header-left\">\r\n          <h2></h2>\r\n        </div>\r\n        <div class=\"header-right\">\r\n          <button class=\"add-task-button not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"add\" />\r\n            <p>Add Task</p>\r\n          </button>\r\n          <button class=\"edit-project-button not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"edit\" />\r\n          </button>\r\n          <button class=\"hamburger-menu not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_10___ + "\" alt=\"hamburger-menu\" />\r\n          </button>\r\n        </div>\r\n      </header>\r\n      <main>\r\n        <div id=\"task-display\" class=\"not-active\"></div>\r\n      </main>\r\n    </section>\r\n\r\n    <!-- popups -->\r\n    <section class=\"popup\" id=\"add-project-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Create New Project</h2>\r\n        <button class=\"close-add-project-form\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"add-project-title-input\">Title</label>\r\n        <input\r\n          type=\"text\"\r\n          id=\"add-project-input\"\r\n          required\r\n          placeholder=\"e.g. Dinner Party\"\r\n        />\r\n        <input type=\"submit\" value=\"Create Project\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"edit-project-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Edit Project</h2>\r\n        <div>\r\n          <button class=\"close-edit-project-form\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n          </button>\r\n          <button class=\"delete-project\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"trash\" />\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"add-project-title-input\">Title</label>\r\n        <input type=\"text\" id=\"edit-project-input\" required />\r\n        <input type=\"submit\" value=\"Confirm Edit\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"add-task-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Create New Task</h2>\r\n        <button id=\"close-add-task-popup\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"input-add-task-title\">Title</label>\r\n        <input\r\n          type=\"text\"\r\n          id=\"input-add-task-title\"\r\n          placeholder=\"e.g. Grocery Shopping\"\r\n        />\r\n        <label for=\"input-add-task-descrip\">Description</label>\r\n        <textarea\r\n          id=\"input-add-task-descrip\"\r\n          rows=\"7\"\r\n          minlength=\"5\"\r\n          ,\r\n          maxlength=\"210\"\r\n          placeholder=\"e.g. Go to the nearest supermarket and buy food, household items, and other necessities for the coming week.\"\r\n          required\r\n        ></textarea>\r\n        <label for=\"input-add-task-due-date\">Due Date</label>\r\n        <input type=\"date\" id=\"input-add-task-due-date\" required />\r\n        <label for=\"input-add-task-priority\">Priority</label>\r\n        <select id=\"input-add-task-priority\">\r\n          <option value=\"low\">Low</option>\r\n          <option value=\"med\">Medium</option>\r\n          <option value=\"high\">High</option>\r\n        </select>\r\n        <input type=\"submit\" value=\"Create Task\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"opened-task\">\r\n      <p id=\"opened-task-status\"></p>\r\n      <h3 id=\"opened-task-title\"></h3>\r\n      <p id=\"opened-task-description\"></p>\r\n      <p id=\"opened-task-due\"></p>\r\n      <div id=\"opened-task-priority\">\r\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_13___ + "\" alt=\"flag\" />\r\n        <p></p>\r\n      </div>\r\n      <div id=\"opened-task-footer\">\r\n        <button id=\"opened-task-main\"></button>\r\n        <button id=\"opened-task-edit\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"edit\" />\r\n        </button>\r\n        <button id=\"opened-task-close\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n    </section>\r\n    <section class=\"popup\" id=\"edit-task\">\r\n      <div class=\"popup-header\">\r\n        <h2>Edit Task</h2>\r\n        <div>\r\n          <button id=\"close-edit-task-popup\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n          </button>\r\n          <button id=\"delete-task-edit-popup\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"trash\" />\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"input-edit-task-title\">Title</label>\r\n        <input\r\n          type=\"text\"\r\n          id=\"input-edit-task-title\"\r\n          placeholder=\"e.g. Grocery Shopping\"\r\n        />\r\n        <label for=\"input-edit-task-descrip\">Description</label>\r\n        <textarea\r\n          id=\"input-edit-task-descrip\"\r\n          rows=\"7\"\r\n          minlength=\"5\"\r\n          ,\r\n          maxlength=\"210\"\r\n          placeholder=\"e.g. Go to the nearest supermarket and buy food, household items, and other necessities for the coming week.\"\r\n          required\r\n        ></textarea>\r\n        <label for=\"input-edit-task-due-date\">Due Date</label>\r\n        <input type=\"date\" id=\"input-edit-task-due-date\" required />\r\n        <label for=\"input-edit-task-priority\">Priority</label>\r\n        <select id=\"input-edit-task-priority\">\r\n          <option value=\"low\">Low</option>\r\n          <option value=\"med\">Medium</option>\r\n          <option value=\"high\">High</option>\r\n        </select>\r\n        <input type=\"submit\" value=\"Confirm Edit\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"overlay\"></section>\r\n  </body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/images/all.svg":
/*!***********************************!*\
  !*** ./src/assets/images/all.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "all.svg";

/***/ }),

/***/ "./src/assets/images/close.svg":
/*!*************************************!*\
  !*** ./src/assets/images/close.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "close.svg";

/***/ }),

/***/ "./src/assets/images/day.svg":
/*!***********************************!*\
  !*** ./src/assets/images/day.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "day.svg";

/***/ }),

/***/ "./src/assets/images/edit.svg":
/*!************************************!*\
  !*** ./src/assets/images/edit.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "edit.svg";

/***/ }),

/***/ "./src/assets/images/feather.svg":
/*!***************************************!*\
  !*** ./src/assets/images/feather.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "feather.svg";

/***/ }),

/***/ "./src/assets/images/flag.svg":
/*!************************************!*\
  !*** ./src/assets/images/flag.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "flag.svg";

/***/ }),

/***/ "./src/assets/images/github.svg":
/*!**************************************!*\
  !*** ./src/assets/images/github.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "github.svg";

/***/ }),

/***/ "./src/assets/images/hamburger.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/hamburger.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "hamburger.svg";

/***/ }),

/***/ "./src/assets/images/hide_arrow.svg":
/*!******************************************!*\
  !*** ./src/assets/images/hide_arrow.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "hide_arrow.svg";

/***/ }),

/***/ "./src/assets/images/moon.svg":
/*!************************************!*\
  !*** ./src/assets/images/moon.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "moon.svg";

/***/ }),

/***/ "./src/assets/images/plus.svg":
/*!************************************!*\
  !*** ./src/assets/images/plus.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "plus.svg";

/***/ }),

/***/ "./src/assets/images/stack-of-sheets.svg":
/*!***********************************************!*\
  !*** ./src/assets/images/stack-of-sheets.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "stack-of-sheets.svg";

/***/ }),

/***/ "./src/assets/images/sun.svg":
/*!***********************************!*\
  !*** ./src/assets/images/sun.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "sun.svg";

/***/ }),

/***/ "./src/assets/images/trash.svg":
/*!*************************************!*\
  !*** ./src/assets/images/trash.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "trash.svg";

/***/ }),

/***/ "./src/assets/images/week.svg":
/*!************************************!*\
  !*** ./src/assets/images/week.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "week.svg";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=bundle8101656ae8969e14312d.js.map