// ELEMENTOS
const form = document.getElementById("task-form")
const input = document.getElementById("task-input")
const taskList = document.getElementById("tasks")
const filterButtons = document.querySelectorAll(".filters button")

// ESTADO
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// SALVAR NO LOCALSTORAGE
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// RENDERIZAR TAREFAS
function renderTasks(filter = "all") {
  taskList.innerHTML = ""

  let filteredTasks = tasks

  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed)
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li")

    li.innerHTML = `
      <span style="text-decoration: ${
        task.completed ? "line-through" : "none"
      }">
        ${task.text}
      </span>
      <div>
        <button data-index="${index}" class="toggle">✔</button>
        <button data-index="${index}" class="delete">✖</button>
      </div>
    `

    taskList.appendChild(li)
  })
}

// ADICIONAR TAREFA
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const text = input.value.trim()
  if (text === "") return

  tasks.push({ text, completed: false })
  saveTasks()
  renderTasks()

  input.value = ""
})

// CLICK NAS TAREFAS
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) {
    const index = e.target.dataset.index
    tasks[index].completed = !tasks[index].completed
  }

  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index
    tasks.splice(index, 1)
  }

  saveTasks()
  renderTasks()
})

// FILTROS
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active")
    button.classList.add("active")

    const filter = button.dataset.filter
    renderTasks(filter)
  })
})

// INICIAL
renderTasks()
function renderTasks(filter = "all") {
  taskList.innerHTML = ""

  let filteredTasks = tasks

  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed)
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li")

    if (task.completed) {
      li.classList.add("completed")
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button data-index="${index}" class="toggle">✔</button>
        <button data-index="${index}" class="delete">✖</button>
      </div>
    `

    taskList.appendChild(li)
  })
}
tasks.push({ text, completed: false })
saveTasks()
renderTasks()

input.style.border = "2px solid #7c4dff"
setTimeout(() => {
  input.style.border = "none"
}, 300)
