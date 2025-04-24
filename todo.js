const fs = require('fs');
const [,, cmd, ...args] = process.argv;
const file = 'todo.json';

function loadTodos() {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
}

function saveTodos(todos) {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
}

const todos = loadTodos();

if (cmd === 'add') {
  todos.push({ task: args.join(' '), done: false });
  saveTodos(todos);
  console.log('Added.');
} else if (cmd === 'list') {
  todos.forEach((t, i) => console.log(`${i + 1}. ${t.task} [${t.done ? '✓' : ' '}]`));
} else if (cmd === 'done') {
  const index = parseInt(args[0]) - 1;
  if (todos[index]) {
    todos[index].done = true;
    saveTodos(todos);
    console.log('Marked as done.');
  }
}
