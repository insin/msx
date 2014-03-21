/**
 * JSX version of the Mithril Getting Started documentation's TODO example.
 * http://lhorie.github.io/mithril/getting-started.html
 * @jsx m
 */

//this application only has one module: todo
var todo = {};

//for simplicity, we use this module to namespace the model classes

//the Todo class has two properties
todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;

//the controller uses 3 model-level entities, of which one is a custom defined class:
//`Todo` is the central class in this application
//`list` is merely a generic array, with standard array methods
//`description` is a temporary storage box that holds a string
//
//the `add` method simply adds a new todo to the list
todo.controller = function() {
    this.list = new todo.TodoList();
    this.description = m.prop("");

    this.add = function(description) {
        if (description()) {
            this.list.push(new todo.Todo({description: description()}));
            this.description("");
        }
    };
};

//here's the view
todo.view = function(ctrl) {
  return m("html", [
    m("body", [
      m("input", {onchange:m.withAttr("value", ctrl.description), value:ctrl.description()}),
      m("button", {onclick:ctrl.add.bind(ctrl, ctrl.description)}, ["Add"]),
      m("table", [
        ctrl.list.map(function(task, index) {
          return m("tr", [
            m("td", [
              m("input",
                {type:"checkbox",
                onclick:m.withAttr("checked", task.done),
                checked:task.done()}
               )
            ]),
            m("td", {style:{textDecoration: task.done() ? "line-through" : "none"}}, [
              task.description()
            ])
          ])
        })
      ])
    ])
  ])
};

//initialize the application
m.module(document, todo);