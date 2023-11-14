import projectIconSrc from "../assets/images/feather.svg";
import taskPriorityFlagSrc from "../assets/images/flag.svg";

import task from "./task";
import project from "./project";
import createToDoList from "./todolist";

const toDoList = createToDoList();
const project1 = project("TaskStack-Project");
const task1 = task(
  "Light & Dark mode",
  "User should be able to toggle a switch to make website either dark or light mode",
  "2023-10-05",
  "low"
);
const task2 = task(
  "Restructure Code into Modules",
  "This task involves organizing and restructuring the project's codebase into modular components. Breaking down the code into manageable modules will improve code maintainability, readability, and scalability.",
  "2023-10-06",
  "high"
);
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

document
  .querySelector(".light-dark-mode input")
  .addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
  });

//date tasks

const renderSpecificTasks = (date) => {
  document.querySelector(".add-task-button").classList.add("not-active");
  document.querySelector(".edit-project-button").classList.add("not-active");
  const projectDisplay = document.querySelector("#task-display");
  projectDisplay.textContent = "";
  projectDisplay.classList.remove("not-active");

  const projects = toDoList.getProjects();

  projects.forEach((project) => {
    const createCard = (taskList) => {
      const container = document.createElement("div");
      container.classList.add("date-container");
      const header = document.createElement("div");
      header.classList.add("date-header");
      const containerTitle = document.createElement("h3");
      containerTitle.textContent = project.getName();
      const line = document.createElement("div");
      line.classList.add("hr");
      const seeProject = document.createElement("button");
      seeProject.textContent = "SEE PROJECT";
      seeProject.classList.add(project.getName());

      seeProject.addEventListener("click", openProject);

      header.append(containerTitle, line, seeProject);
      const tasks = document.createElement("ul");
      tasks.classList.add("date-tasks");

      taskList.forEach((task) => {
        const taskContainer = document.createElement("li");

        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.getTitle();

        const taskFooter = document.createElement("div");
        taskFooter.classList.add("task-footer");
        const taskPriority = document.createElement("div");
        taskPriority.classList.add("task-priority");
        const taskPriorityFlag = document.createElement("img");
        taskPriorityFlag.classList.add(task.getPriority());
        taskPriorityFlag.src = taskPriorityFlagSrc;
        const taskPriorityText = document.createElement("p");
        taskPriorityText.textContent = task.getPriority();
        taskPriority.append(taskPriorityFlag, taskPriorityText);

        const taskDueDate = document.createElement("div");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = `due ${task.getDateWithoutYear()}`;
        taskFooter.append(taskPriority, taskDueDate);

        taskContainer.append(taskTitle, taskFooter);

        taskContainer.addEventListener("click", () => {
          openTask(task.getTitle(), project.getName());
          document
            .querySelector("#opened-task-edit")
            .classList.add("not-active");
          const mainButton = document.querySelector("#opened-task-main");
          mainButton.classList.add(project.getName());
          mainButton.textContent = "Open Project";
          mainButton.removeEventListener("click", completeTask);
          mainButton.removeEventListener("click", deleteTask);
          mainButton.addEventListener(
            "click",
            (e) => {
              openProject(e);
              togglePopup("#opened-task");
              document
                .querySelector("#opened-task-edit")
                .classList.remove("not-active");
            },
            { once: true }
          );
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

document.querySelector("#today-tasks").addEventListener("click", (e) => {
  document.querySelector(".header-left h2").textContent = "Today";
  renderSpecificTasks("today");
});

document.querySelector("#week-tasks").addEventListener("click", (e) => {
  document.querySelector(".header-left h2").textContent = "This Week";
  renderSpecificTasks("week");
});

document.querySelector("#all-tasks").addEventListener("click", (e) => {
  document.querySelector(".header-left h2").textContent = "All Time";
  renderSpecificTasks("all");
});

//

const togglePopup = (elementId) => {
  document.querySelector(elementId).classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
};

//

const deleteEditedTask = (task) => {
  const currentProjectName =
    document.querySelector(".header-left h2").textContent;

  toDoList.getProject(currentProjectName).removeTask(task.getTitle());
  renderTasks();
};

const editTask = (task) => {
  const title = document.querySelector("#input-edit-task-title");
  title.value = task.getTitle();
  const description = document.querySelector("#input-edit-task-descrip");
  description.value = task.getDescription();
  const dueDate = document.querySelector("#input-edit-task-due-date");
  dueDate.value = task.getDate();
  const priority = document.querySelector("#input-edit-task-priority");
  priority.value = task.getPriority();

  document.querySelector("#edit-task form").addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      task.setTitle(title.value);
      task.setDescription(description.value);
      task.setDate(dueDate.value);
      task.setPriority(priority.value);

      togglePopup("#edit-task");
      renderTasks();
    },
    { once: true }
  );

  document.querySelector("#close-edit-task-popup").addEventListener(
    "click",
    () => {
      togglePopup("#edit-task");
    },
    { once: true }
  );

  document.querySelector("#delete-task-edit-popup").addEventListener(
    "click",
    () => {
      deleteEditedTask(task);
      togglePopup("#edit-task");
    },
    { once: true }
  );
};

const completeTask = () => {
  const currentProjectName =
    document.querySelector(".header-left h2").textContent;
  const currentTaskTitle =
    document.querySelector("#opened-task-title").textContent;

  toDoList
    .getProject(currentProjectName)
    .getTask(currentTaskTitle)
    .completeTask();

  renderTasks();
  togglePopup("#opened-task");
};

const deleteTask = () => {
  const currentProjectName =
    document.querySelector(".header-left h2").textContent;
  const currentTaskTitle =
    document.querySelector("#opened-task-title").textContent;

  toDoList.getProject(currentProjectName).removeTask(currentTaskTitle);

  renderTasks();
  togglePopup("#opened-task");
};

document.querySelector("#opened-task-close").addEventListener("click", () => {
  togglePopup("#opened-task");
});

const openTask = (taskName, projectName) => {
  const currentProjectName =
    document.querySelector(".header-left h2").textContent;
  const projectNameExist = () => {
    if (projectName == undefined) {
      return toDoList.getProject(currentProjectName).getTask(taskName);
    } else {
      return toDoList.getProject(projectName).getTask(taskName);
    }
  };
  const task = projectNameExist();

  const openedTaskContainer = document.querySelector("#opened-task");

  const status = document.querySelector("#opened-task-status");
  const mainButton = document.querySelector("#opened-task-main");
  mainButton.removeEventListener("click", completeTask);
  mainButton.removeEventListener("click", deleteTask);
  if (task.getIsCompleted() === false) {
    status.textContent = "TODO";
    mainButton.textContent = "Complete Task";
    mainButton.addEventListener("click", completeTask, { once: true });
  } else {
    status.textContent = "DONE";
    mainButton.textContent = "Delete Task";
    mainButton.addEventListener("click", deleteTask, { once: true });
  }

  document.querySelector("#opened-task-title").textContent = task.getTitle();
  document.querySelector("#opened-task-description").textContent =
    task.getDescription();
  document.querySelector(
    "#opened-task-due"
  ).textContent = `Due ${task.getDate()}`;
  document.querySelector("#opened-task-priority p").textContent = `${
    task.getPriority()[0].toUpperCase() + task.getPriority().slice(1)
  } Priority`;

  const priorityIcon = document.querySelector("#opened-task-priority img");
  priorityIcon.classList = "";
  priorityIcon.classList.add(task.getPriority());

  document.querySelector("#opened-task-edit").addEventListener(
    "click",
    () => {
      togglePopup("#opened-task");
      togglePopup("#edit-task");

      editTask(task);
    },
    { once: true }
  );

  togglePopup("#opened-task");
};

const renderTasks = () => {
  const currentProject = document.querySelector(".header-left h2").textContent;
  const taskDisplay = document.querySelector("#task-display");
  taskDisplay.textContent = "";

  const container = document.createElement("container");
  container.classList.add("project-render-task");
  const todoTaskContainer = document.createElement("div");
  todoTaskContainer.setAttribute("id", "todo");
  const todoTitleContainer = document.createElement("div");
  const todoTitle = document.createElement("h3");
  todoTitle.textContent = "TODO";
  todoTitleContainer.append(todoTitle);
  const todoTasks = document.createElement("ul");
  todoTaskContainer.append(todoTitleContainer, todoTasks);

  const doneTaskContainer = document.createElement("div");
  doneTaskContainer.setAttribute("id", "done");
  const doneTitleContainer = document.createElement("div");
  const doneTitle = document.createElement("h3");
  doneTitle.textContent = "DONE";
  doneTitleContainer.append(doneTitle);
  const doneTasks = document.createElement("ul");
  doneTaskContainer.append(doneTitleContainer, doneTasks);

  container.append(todoTaskContainer, doneTaskContainer);
  taskDisplay.append(container);
  taskDisplay.classList.remove("not-active");

  const tasks = toDoList.getProject(currentProject).getTasks();

  tasks.forEach((task) => {
    const taskContainer = document.createElement("li");
    taskContainer.classList.add("task-container");

    taskContainer.addEventListener("click", () => {
      const taskName = task.getTitle();
      openTask(taskName);
    });

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = task.getTitle();

    const taskFooter = document.createElement("div");
    taskFooter.classList.add("task-footer");
    const taskPriority = document.createElement("div");
    taskPriority.classList.add("task-priority");
    const taskPriorityFlag = document.createElement("img");
    taskPriorityFlag.classList.add(task.getPriority());
    taskPriorityFlag.src = taskPriorityFlagSrc;
    const taskPriorityText = document.createElement("p");
    taskPriorityText.textContent = task.getPriority();
    taskPriority.append(taskPriorityFlag, taskPriorityText);

    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = `due ${task.getDateWithoutYear()}`;
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

const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", () => {
  togglePopup("#add-task-popup");
});

const closeAddTaskPopup = document.querySelector("#close-add-task-popup");
closeAddTaskPopup.addEventListener("click", () => {
  togglePopup("#add-task-popup");
});

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

  const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);
  toDoList.getProject(currentProject).addTask(newTask);
  console.log(toDoList.projects[0].getTasks());

  renderTasks();
  clearAddTaskForm();
  togglePopup("#add-task-popup");
};
addTaskForm.addEventListener("submit", createTask);

//

//handle projects

const deleteProject = () => {
  const currentProject = document.querySelector(".header-left h2").textContent;

  toDoList.removeProject(currentProject);

  document.querySelector(".header-left h2").textContent = ""; // update header
  togglePopup("#edit-project-popup"); // close pop up
  renderProjects(); // update sidebar
  document.querySelector("#task-display").classList.toggle("not-active");

  document.querySelector(".add-task-button").classList.add("not-active");
  document.querySelector(".edit-project-button").classList.add("not-active");
};

const deleteProjectButton = document.querySelector(".delete-project");
deleteProjectButton.addEventListener("click", deleteProject);

const editProjectForm = document.querySelector("#edit-project-popup form");
const editProject = (e) => {
  e.preventDefault();
  const currentProject = document.querySelector(".header-left h2").textContent;
  const newName = document.querySelector("#edit-project-input").value;

  toDoList.getProject(currentProject).setName(newName);
  document.querySelector(".header-left h2").textContent = newName; // update header
  togglePopup("#edit-project-popup"); // close pop up
  renderProjects(); // update sidebar
};
editProjectForm.addEventListener("submit", editProject);

const closeEditProjectForm = document.querySelector(".close-edit-project-form");
closeEditProjectForm.addEventListener("click", () => {
  togglePopup("#edit-project-popup");
});

const openProject = (e) => {
  const currentProject = e.target.classList;
  const addTaskButton = document.querySelector(".add-task-button");
  addTaskButton.classList.remove("not-active");
  const editProjectButton = document.querySelector(".edit-project-button");
  editProjectButton.classList.remove("not-active");
  editProjectButton.addEventListener("click", () => {
    togglePopup("#edit-project-popup");
    document.querySelector("#edit-project-input").value = currentProject;
  });

  const headerTitle = document.querySelector(".header-left h2");
  headerTitle.textContent = currentProject;

  renderTasks();
};

const renderProjects = () => {
  const projectsTitle = document.querySelector(".projects-title");
  projectsTitle.textContent = `PROJECTS (${toDoList.getProjects().length})`;
  const projectsList = document.querySelector(".projects-list");
  projectsList.textContent = ""; //reset projectList

  toDoList.getProjects().forEach((project) => {
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

createProjectButton.addEventListener("click", () => {
  togglePopup("#add-project-popup");
});

const closeAddProjectForm = document.querySelector(".close-add-project-form");

closeAddProjectForm.addEventListener("click", () => {
  togglePopup("#add-project-popup");
});

const createProject = (e) => {
  e.preventDefault();
  const newProject = project(
    document.querySelector("#add-project-input").value
  );
  toDoList.addProject(newProject);
  renderProjects();

  document.querySelector("#add-project-input").value = "";
  togglePopup("#add-project-popup");
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
