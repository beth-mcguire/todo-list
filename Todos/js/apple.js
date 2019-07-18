const   mainForm = document.querySelector("#main-form"),
        addNew = document.querySelector("#add-todo")

let todos = checkData();

const filters = {
    searchText: "",
    hideCompleted: false
}

renderTodos(todos, filters)

mainForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: addNew.value,
        completed: false
    })
    renderTodos(todos, filters)
    saveTodos(todos)
    mainForm.reset()
})

document.querySelector("#filter").addEventListener('keyup', (e) =>{
    filters.searchText = e.target.value;
    renderTodos(todos, filters)
})

document.querySelector("#checkbox").addEventListener('change', (e) =>{
   filters.hideCompleted = e.target.checked;
   renderTodos(todos, filters)
})