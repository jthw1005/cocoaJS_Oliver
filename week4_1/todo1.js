class MyModel {
  constructor() {
    this.todoList = [];
    this.listNum = 0;
  }

  addTodo() {}

  editTodo() {}

  deleteTodo() {}

  checkTodo() {}
}

class MyView {
  constructor() {}

  paintTodo() {}
}

class MyController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  handleAddTodo = () => {};

  handleEditTodo = () => {};

  handleDeleteTodo = () => {};

  handleCheckTodo = () => {};
}

const myTodo = new Controller(new Model(), new View());
