export default function createToDoList() {
  let projects = [];

  const setProjects = (newProjects) => (projects = newProjects);
  const getProjects = () => projects;

  const getProject = (projectName) => {
    return projects.find((project) => project.getName() === projectName);
  };
  const addProject = (newProject) => projects.push(newProject);
  const removeProject = (projectName) => {
    const projectToRemove = projects.find(
      (project) => project.getName() === projectName
    );
    projects.splice(projects.indexOf(projectToRemove));
  };
  return { setProjects, getProjects, getProject, addProject, removeProject };
}
