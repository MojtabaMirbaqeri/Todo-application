let tasksArray = [
  {
    isComplete: true,
    title: "Create todo app",
  },
  {
    isComplete: false,
    title: "Learn Vue.JS",
  },
  {
    isComplete: false,
    title: "Study JS book",
  },
];

const toggleThemeEl = document.querySelector("#toggle-theme");
const tasksListConEl = document.querySelector(".tasks-list");
const inputEl = document.querySelector("#task-input");
const clearCompletedBtn = document.querySelector(".clear-completed");
const filtersContainer = document.querySelector("#filters-container");

toggleThemeEl.addEventListener("click", () => {
  if (document.body.classList.contains("dark-theme")) {
    toggleThemeEl.src = "./images/icon-moon.svg";
  } else {
    toggleThemeEl.src = "./images/icon-sun.svg";
  }
  document.body.classList.toggle("dark-theme");
});

function createTasksList(array) {
  if (array) {
    tasksListConEl.innerHTML = "";
    array.forEach((task, index) => {
      let taskEl = `<div class="task transition p-3 ${
        task.isComplete ? "completed" : ""
      }"  id="task-${index}">
    <div class="d-flex gap-3 align-items-center">
      <div class="check-bullet"></div>
      <p class="mb-0">${task.title}</p>
    </div>
    <img class="cross-icon" src="images/icon-cross.svg" alt="" />`;
      tasksListConEl.insertAdjacentHTML("beforeend", taskEl);
      let bulletBtnEl = document.querySelector(`#task-${index} .check-bullet`);
      bulletBtnEl.addEventListener("click", () => {
        completeTask(task);
      });

      let deleteBtnEl = document.querySelector(`#task-${index} img`);
      deleteBtnEl.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  }
}
window.addEventListener("load", () => {
  createTasksList(tasksArray);
});

function completeTask(task) {
  task.isComplete = !task.isComplete;
  createTasksList(tasksArray);
}

function deleteTask(index) {
  tasksArray.splice(index, 1);
  createTasksList(tasksArray);
}

inputEl.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    let newTask = {
      isComplete: false,
      title: inputEl.value,
    };
    inputEl.value = "";
    tasksArray.push(newTask);
    createTasksList(tasksArray);
  }
});

clearCompletedBtn.addEventListener("click", () => {
  tasksArray = tasksArray.filter((task) => {
    return task.isComplete == false;
  });
  createTasksList(tasksArray);
});

filtersContainer.addEventListener("click", (e) => {
  if (e.target.tagName == "SPAN") {
    let targetClass = e.target.className;
    let filteredArray;
    if (targetClass.includes("all-fliter")) {
      filteredArray = tasksArray.filter(() => {
        return true;
      });
    } else if (targetClass.includes("active-filter")) {
      filteredArray = tasksArray.filter((task) => {
        return task.isComplete == false;
      });
    } else if (targetClass.includes("completed-filter")) {
      filteredArray = tasksArray.filter((task) => {
        return task.isComplete == true;
      });
    }
    createTasksList(filteredArray);
  }
});
