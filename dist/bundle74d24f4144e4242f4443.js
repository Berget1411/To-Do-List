(self["webpackChunktaskstack"] = self["webpackChunktaskstack"] || []).push([["bundle"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_images_feather_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/images/feather.svg */ "./src/assets/images/feather.svg");
/* harmony import */ var _assets_images_flag_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/images/flag.svg */ "./src/assets/images/flag.svg");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todolist */ "./src/modules/todolist.js");





var toDoList = new _todolist__WEBPACK_IMPORTED_MODULE_4__["default"]();
var project1 = new _project__WEBPACK_IMPORTED_MODULE_3__["default"]("TaskStack-Project");
var task1 = new _task__WEBPACK_IMPORTED_MODULE_2__["default"]("Light & Dark mode", "User should be able to toggle a switch to make website either dark or light mode", "2023-10-05", "low");
var task2 = new _task__WEBPACK_IMPORTED_MODULE_2__["default"]("Restructure Code into Modules", "This task involves organizing and restructuring the project's codebase into modular components. Breaking down the code into manageable modules will improve code maintainability, readability, and scalability.", "2023-10-06", "high");
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
      console.log(project.getTasksToday());
      if (project.getTasksToday().length > 0) {
        createCard(project.getTasksToday());
      }
    } else if (date == "week") {
      console.log(project.getTasksThisWeek());
      if (project.getTasksThisWeek().length > 0) {
        createCard(project.getTasksThisWeek());
      }
    } else {
      console.log(project.getTasks());
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
  if (task.isCompleted === false) {
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
    if (task.isCompleted == false) {
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
  var newTask = new _task__WEBPACK_IMPORTED_MODULE_2__["default"](taskTitle, taskDescription, taskDueDate, taskPriority);
  toDoList.getProject(currentProject).addTask(newTask);
  console.log(toDoList.projects[0].getTasks());
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
  projectsTitle.textContent = "PROJECTS (".concat(toDoList.projects.length, ")");
  var projectsList = document.querySelector(".projects-list");
  projectsList.textContent = ""; //reset projectList

  toDoList.projects.forEach(function (project) {
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
  var newProject = new _project__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector("#add-project-input").value);
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/subDays/index.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

var Project = /*#__PURE__*/function () {
  function Project(name) {
    _classCallCheck(this, Project);
    this.name = name;
    this.tasks = [];
  }
  _createClass(Project, [{
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "setTasks",
    value: function setTasks(tasks) {
      this.tasks = tasks;
    }
  }, {
    key: "getTasks",
    value: function getTasks() {
      return this.tasks;
    }
  }, {
    key: "getTask",
    value: function getTask(taskTitle) {
      return this.tasks.find(function (task) {
        return task.getTitle() === taskTitle;
      });
    }
  }, {
    key: "addTask",
    value: function addTask(newTask) {
      this.tasks.push(newTask);
    }
  }, {
    key: "removeTask",
    value: function removeTask(taskTitle) {
      var taskToRemove = this.tasks.find(function (task) {
        return task.getTitle() === taskTitle;
      });
      this.tasks.splice(this.tasks.indexOf(taskToRemove));
    }
  }, {
    key: "getTasksToday",
    value: function getTasksToday() {
      return this.tasks.filter(function (task) {
        var taskDate = new Date(task.getDateFormatted());
        return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(taskDate));
      });
    }
  }, {
    key: "getTasksThisWeek",
    value: function getTasksThisWeek() {
      return this.tasks.filter(function (task) {
        var taskDate = new Date(task.getDateFormatted());
        return (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(taskDate), 1));
      });
    }
  }]);
  return Project;
}();


/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Task = /*#__PURE__*/function () {
  function Task(taskTitle, description, dueDate, priority) {
    _classCallCheck(this, Task);
    this.taskTitle = taskTitle;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false;
  }
  _createClass(Task, [{
    key: "setTitle",
    value: function setTitle(taskTitle) {
      this.taskTitle = taskTitle;
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.taskTitle;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.description = description;
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.description;
    }
  }, {
    key: "setDate",
    value: function setDate(dueDate) {
      this.dueDate = dueDate;
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return this.dueDate;
    }
  }, {
    key: "getDateFormatted",
    value: function getDateFormatted() {
      var day = this.dueDate.split("-")[2];
      var month = this.dueDate.split("-")[1];
      var year = this.dueDate.split("-")[0];
      return "".concat(month, "/").concat(day, "/").concat(year);
    }
  }, {
    key: "getDateWithoutYear",
    value: function getDateWithoutYear() {
      var day = this.dueDate.split("-")[2];
      var month = this.dueDate.split("-")[1];
      return "".concat(month, "/").concat(day);
    }
  }, {
    key: "setPriority",
    value: function setPriority(priority) {
      this.priority = priority;
    }
  }, {
    key: "getPriority",
    value: function getPriority() {
      return this.priority;
    }
  }, {
    key: "completeTask",
    value: function completeTask() {
      this.isCompleted = true;
    }
  }]);
  return Task;
}();


/***/ }),

/***/ "./src/modules/todolist.js":
/*!*********************************!*\
  !*** ./src/modules/todolist.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var ToDoList = /*#__PURE__*/function () {
  function ToDoList() {
    _classCallCheck(this, ToDoList);
    this.projects = [];
  }
  _createClass(ToDoList, [{
    key: "setProjects",
    value: function setProjects(projects) {
      this.projects = projects;
    }
  }, {
    key: "getProjects",
    value: function getProjects() {
      return this.projects;
    }
  }, {
    key: "getProject",
    value: function getProject(projectName) {
      return this.projects.find(function (project) {
        return project.getName() === projectName;
      });
    }
  }, {
    key: "addProject",
    value: function addProject(newProject) {
      this.projects.push(newProject);
    }
  }, {
    key: "removeProject",
    value: function removeProject(projectName) {
      var projectToRemove = this.projects.find(function (project) {
        return project.getName() === projectName;
      });
      this.projects.splice(this.projects.indexOf(projectToRemove));
    }
  }]);
  return ToDoList;
}();


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nTypeError: Cannot read properties of undefined (reading 'indexOf')\n    at C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:115615:12\n    at Object.applyHooksTransformer (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:1863:14)\n    at Object.initHooks (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:1843:251)\n    at Object.initNativeDispatchContinue (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:1809:9)\n    at Object.initNativeDispatch (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:1803:9)\n    at Object.getNativeInterceptor (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:28982:13)\n    at Object.getInterceptor$x (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:29243:16)\n    at Object.set$compile$x (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:29307:16)\n    at Object.main (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:24128:9)\n    at main2 (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:25922:9)\n    at C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:116680:7\n    at C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:116659:7\n    at dartProgram (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:116674:5)\n    at _cliPkgExports.load (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.dart.js:116682:3)\n    at Object.<anonymous> (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass\\sass.node.js:4:9)\n    at Module._compile (node:internal/modules/cjs/loader:1369:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)\n    at Module.load (node:internal/modules/cjs/loader:1201:32)\n    at Module._load (node:internal/modules/cjs/loader:1017:12)\n    at Module.require (node:internal/modules/cjs/loader:1229:19)\n    at require (node:internal/modules/helpers:177:18)\n    at getDefaultSassImplementation (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass-loader\\dist\\utils.js:37:10)\n    at getSassImplementation (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass-loader\\dist\\utils.js:46:30)\n    at Object.loader (C:\\Users\\Ludvi\\repos\\To-Do-List\\node_modules\\sass-loader\\dist\\index.js:23:55)");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>TaskStack</title>\r\n  </head>\r\n  <body>\r\n    <section class=\"content\">\r\n      <section class=\"sidebar\">\r\n        <div class=\"sidebar-top\">\r\n          <div class=\"banner\">\r\n            <img\r\n              src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\r\n              alt=\"stack-of-sheets\"\r\n            />\r\n            <h1>TaskStack</h1>\r\n          </div>\r\n          <div class=\"due\">\r\n            <h2>DUE</h2>\r\n            <ul>\r\n              <li id=\"today-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"today\" />\r\n                <p>Today</p>\r\n              </li>\r\n              <li id=\"week-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"week\" />\r\n                <p>This Week</p>\r\n              </li>\r\n              <li id=\"all-tasks\">\r\n                <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"all-time\" />\r\n                <p>All Time</p>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n          <div class=\"projects\">\r\n            <h2 class=\"projects-title\"></h2>\r\n            <ul class=\"projects-list\"></ul>\r\n            <button class=\"create-project\">\r\n              <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"plus\" />\r\n              <p>CREATE PROJECT</p>\r\n            </button>\r\n          </div>\r\n        </div>\r\n        <div class=\"sidebar-bottom\">\r\n          <div class=\"light-dark-mode\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"day\" />\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" />\r\n              <span class=\"slider\"></span>\r\n            </label>\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"moon\" />\r\n          </div>\r\n          <div class=\"collapse\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_7___ + "\" alt=\"arrow\" />\r\n            <p>COLLAPSE</p>\r\n          </div>\r\n          <footer>\r\n            <a href=\"https://github.com/Berget1411\">\r\n              <p>Made by Berget</p>\r\n              <img src=\"" + ___HTML_LOADER_REPLACEMENT_8___ + "\" alt=\"github-icon\" />\r\n            </a>\r\n          </footer>\r\n        </div>\r\n      </section>\r\n      <header>\r\n        <div class=\"header-left\">\r\n          <h2></h2>\r\n        </div>\r\n        <div class=\"header-right\">\r\n          <button class=\"add-task-button not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"add\" />\r\n            <p>Add Task</p>\r\n          </button>\r\n          <button class=\"edit-project-button not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"edit\" />\r\n          </button>\r\n          <button class=\"hamburger-menu not-active\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_10___ + "\" alt=\"hamburger-menu\" />\r\n          </button>\r\n        </div>\r\n      </header>\r\n      <main>\r\n        <div id=\"task-display\" class=\"not-active\"></div>\r\n      </main>\r\n    </section>\r\n\r\n    <!-- popups -->\r\n    <section class=\"popup\" id=\"add-project-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Create New Project</h2>\r\n        <button class=\"close-add-project-form\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"add-project-title-input\">Title</label>\r\n        <input type=\"text\" id=\"add-project-input\" required />\r\n        <input type=\"submit\" value=\"Create Project\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"edit-project-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Edit Project</h2>\r\n        <div>\r\n          <button class=\"close-edit-project-form\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n          </button>\r\n          <button class=\"delete-project\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"trash\" />\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"add-project-title-input\">Title</label>\r\n        <input type=\"text\" id=\"edit-project-input\" required />\r\n        <input type=\"submit\" value=\"Confirm Edit\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"add-task-popup\">\r\n      <div class=\"popup-header\">\r\n        <h2>Create New Task</h2>\r\n        <button id=\"close-add-task-popup\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"input-add-task-title\">Title</label>\r\n        <input\r\n          type=\"text\"\r\n          id=\"input-add-task-title\"\r\n          placeholder=\"e.g. Grocery Shopping\"\r\n        />\r\n        <label for=\"input-add-task-descrip\">Description</label>\r\n        <textarea\r\n          id=\"input-add-task-descrip\"\r\n          rows=\"7\"\r\n          minlength=\"5\"\r\n          ,\r\n          maxlength=\"210\"\r\n          placeholder=\"e.g. Go to the nearest supermarket and buy food, household items, and other necessities for the coming week.\"\r\n          required\r\n        ></textarea>\r\n        <label for=\"input-add-task-due-date\">Due Date</label>\r\n        <input type=\"date\" id=\"input-add-task-due-date\" required />\r\n        <label for=\"input-add-task-priority\">Priority</label>\r\n        <select id=\"input-add-task-priority\">\r\n          <option value=\"low\">Low</option>\r\n          <option value=\"med\">Medium</option>\r\n          <option value=\"high\">High</option>\r\n        </select>\r\n        <input type=\"submit\" value=\"Create Task\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"popup\" id=\"opened-task\">\r\n      <p id=\"opened-task-status\"></p>\r\n      <h3 id=\"opened-task-title\"></h3>\r\n      <p id=\"opened-task-description\"></p>\r\n      <p id=\"opened-task-due\"></p>\r\n      <div id=\"opened-task-priority\">\r\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_13___ + "\" alt=\"flag\" />\r\n        <p></p>\r\n      </div>\r\n      <div id=\"opened-task-footer\">\r\n        <button id=\"opened-task-main\"></button>\r\n        <button id=\"opened-task-edit\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"edit\" />\r\n        </button>\r\n        <button id=\"opened-task-close\">\r\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n        </button>\r\n      </div>\r\n    </section>\r\n    <section class=\"popup\" id=\"edit-task\">\r\n      <div class=\"popup-header\">\r\n        <h2>Edit Task</h2>\r\n        <div>\r\n          <button id=\"close-edit-task-popup\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"close\" />\r\n          </button>\r\n          <button id=\"delete-task-edit-popup\">\r\n            <img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"trash\" />\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <form action=\"\">\r\n        <label for=\"input-edit-task-title\">Title</label>\r\n        <input\r\n          type=\"text\"\r\n          id=\"input-edit-task-title\"\r\n          placeholder=\"e.g. Grocery Shopping\"\r\n        />\r\n        <label for=\"input-edit-task-descrip\">Description</label>\r\n        <textarea\r\n          id=\"input-edit-task-descrip\"\r\n          rows=\"7\"\r\n          minlength=\"5\"\r\n          ,\r\n          maxlength=\"210\"\r\n          placeholder=\"e.g. Go to the nearest supermarket and buy food, household items, and other necessities for the coming week.\"\r\n          required\r\n        ></textarea>\r\n        <label for=\"input-edit-task-due-date\">Due Date</label>\r\n        <input type=\"date\" id=\"input-edit-task-due-date\" required />\r\n        <label for=\"input-edit-task-priority\">Priority</label>\r\n        <select id=\"input-edit-task-priority\">\r\n          <option value=\"low\">Low</option>\r\n          <option value=\"med\">Medium</option>\r\n          <option value=\"high\">High</option>\r\n        </select>\r\n        <input type=\"submit\" value=\"Confirm Edit\" class=\"submit-form\" />\r\n      </form>\r\n    </section>\r\n    <section class=\"overlay\"></section>\r\n  </body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


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

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";
module.exports = __webpack_require__.p + "all.svg";

/***/ }),

/***/ "./src/assets/images/close.svg":
/*!*************************************!*\
  !*** ./src/assets/images/close.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "close.svg";

/***/ }),

/***/ "./src/assets/images/day.svg":
/*!***********************************!*\
  !*** ./src/assets/images/day.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "day.svg";

/***/ }),

/***/ "./src/assets/images/edit.svg":
/*!************************************!*\
  !*** ./src/assets/images/edit.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "edit.svg";

/***/ }),

/***/ "./src/assets/images/feather.svg":
/*!***************************************!*\
  !*** ./src/assets/images/feather.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "feather.svg";

/***/ }),

/***/ "./src/assets/images/flag.svg":
/*!************************************!*\
  !*** ./src/assets/images/flag.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "flag.svg";

/***/ }),

/***/ "./src/assets/images/github.svg":
/*!**************************************!*\
  !*** ./src/assets/images/github.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "github.svg";

/***/ }),

/***/ "./src/assets/images/hamburger.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/hamburger.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "hamburger.svg";

/***/ }),

/***/ "./src/assets/images/hide_arrow.svg":
/*!******************************************!*\
  !*** ./src/assets/images/hide_arrow.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "hide_arrow.svg";

/***/ }),

/***/ "./src/assets/images/moon.svg":
/*!************************************!*\
  !*** ./src/assets/images/moon.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "moon.svg";

/***/ }),

/***/ "./src/assets/images/plus.svg":
/*!************************************!*\
  !*** ./src/assets/images/plus.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "plus.svg";

/***/ }),

/***/ "./src/assets/images/stack-of-sheets.svg":
/*!***********************************************!*\
  !*** ./src/assets/images/stack-of-sheets.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "stack-of-sheets.svg";

/***/ }),

/***/ "./src/assets/images/sun.svg":
/*!***********************************!*\
  !*** ./src/assets/images/sun.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "sun.svg";

/***/ }),

/***/ "./src/assets/images/trash.svg":
/*!*************************************!*\
  !*** ./src/assets/images/trash.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "trash.svg";

/***/ }),

/***/ "./src/assets/images/week.svg":
/*!************************************!*\
  !*** ./src/assets/images/week.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "week.svg";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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
//# sourceMappingURL=bundle74d24f4144e4242f4443.js.map