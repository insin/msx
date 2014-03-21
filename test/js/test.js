/**
 * JSX version of https://github.com/jpmonette/todomvc-mithril/blob/1d627f1d5dc0890d0a99cdcb16d09387f68f6df0/js/views/todo-view.js
 * @jsx m
 */

'use strict';

function view(ctrl) {
  var clearCompleted
  if (ctrl.amountCompleted() != 0) {
    clearCompleted = m("button", {id:"clear-completed", onclick:ctrl.clearCompleted.bind(ctrl)}, [
      "Clear completed (",ctrl.amountCompleted(),")"
    ])
  }

  var todos = ctrl.list.map(function(task, index) {
    return m("li", {className:task.completed() && 'completed'}, [
      m("div", {className:"view"}, [
        m("input",
          {className:"toggle",
          type:"checkbox",
          onclick:m.withAttr('checked', task.completed),
          checked:task.completed()}
        ),
        m("label", [task.title()]),
        m("button", {className:"destroy", onclick:ctrl.remove.bind(ctrl, index)})
      ]),
      m("input", {className:"edit"})
    ])
  })

  return m("div", {id:"todoapp"}, [
    m("header", {id:"header"}, [
      m("h1", ["todos"]),
      m("input",
        {id:"new-todo",
        placeholder:"What needs to be done?",
        onkeydown:function(e) { m.withAttr('value', ctrl.title)(e); ctrl.add(ctrl.title, e) },
        value:ctrl.title()}
      )
    ]),
    m("section", {id:"main"}, [
      m("input", {id:"toggle-all", type:"checkbox"}),
      m("ul", {id:"todo-list"}, [
        todos
      ])
    ]),
    m("footer", {id:"footer"}, [
      m("span", {id:"todo-count"}, [
        m("strong", [ctrl.list.length, " item",ctrl.list.length > 1 ? 's' : '', " left"])
      ]),
      m("ul", {id:"filters"}, [
        m("li", {className:"selected"}, [
          m("a", {href:"#/"}, ["All"])
        ]),
        m("li", [
          m("a", {href:"#/active"}, ["Active"])
        ]),
        m("li", [
          m("a", {href:"#/completed"}, ["Completed"])
        ])
      ]),
      clearCompleted
    ])
  ])
}

module.exports = view