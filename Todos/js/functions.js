// Check for Saved Storage

const checkData = () => {
  const todosJSON = localStorage.getItem("todo");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

const saveTodos = () => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

// Remove Todo
const removeTodo = id => {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
  renderTodos(todos, filters);
};

// Render elements

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const searchCompleted = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && searchCompleted;
  });

  items.innerHTML = "";

  document.querySelector("#num-todos").innerHTML = "";

  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  document
    .querySelector("#num-todos")
    .appendChild(generateSummary(incompleteTodos));

  filteredTodos.forEach(function(todo) {
    items.appendChild(makeNewTodo(todo));
  });
};

const makeNewTodo = todo => {
  // Setup new LIs
  const newEl = document.createElement("li");
  newEl.textContent = todo.text;
  newEl.classList.add("items");

  // Setup the Button to the right
  const button = document.createElement("button");
  button.textContent = "X";
  button.classList.add("delete");

  // Setup the Checkboxes
  const checkers = document.createElement("input");
  checkers.setAttribute("type", "checkbox");
  checkers.classList.add("check");
  checkers.checked = todo.completed;
  checkers.addEventListener("change", function(e) {
    console.log(e.target.checked);
    todo.completed = e.target.checked;
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  newEl.appendChild(checkers);

  // Append button and checkboxes to LI
  newEl.appendChild(button);
  button.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  return newEl;
};

const generateSummary = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
