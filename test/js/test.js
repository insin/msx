/**
 * JSX version of https://github.com/jpmonette/todomvc-mithril/blob/1d627f1d5dc0890d0a99cdcb16d09387f68f6df0/js/views/todo-view.js
 * @jsx m
 */

'use strict';

function view(ctrl) {
  var clearCompleted
  if (ctrl.amountCompleted() != 0) {
    clearCompleted = {tag: "button", attrs: {id:"clear-completed", onclick:ctrl.clearCompleted.bind(ctrl)}, children: [
      "Clear completed (",ctrl.amountCompleted(),")"
    ]}
  }

  var todos = ctrl.list.map(function(task, index) {
    return {tag: "li", attrs: {className:task.completed() && 'completed'}, children: [
      {tag: "div", attrs: {className:"view"}, children: [
        {tag: "input", attrs:
          {className:"toggle",
          type:"checkbox",
          onclick:m.withAttr('checked', task.completed),
          checked:task.completed()}
        },
        {tag: "label", attrs: {}, children: [task.title()]},
        {tag: "button", attrs: {className:"destroy", onclick:ctrl.remove.bind(ctrl, index)}}
      ]},
      {tag: "input", attrs: {className:"edit"}}
    ]}
  })

  return {tag: "div", attrs: {id:"todoapp"}, children: [
    {tag: "header", attrs: {id:"header"}, children: [
      {tag: "h1", attrs: {}, children: ["todos"]},
      {tag: "input", attrs:
        {id:"new-todo",
        placeholder:"What needs to be done?",
        onkeydown:function(e) { m.withAttr('value', ctrl.title)(e); ctrl.add(ctrl.title, e) },
        value:ctrl.title()}
      }
    ]},
    {tag: "section", attrs: {id:"main"}, children: [
      {tag: "input", attrs: {id:"toggle-all", type:"checkbox"}},
      {tag: "ul", attrs: {id:"todo-list"}, children: [
        todos
      ]}
    ]},
    {tag: "footer", attrs: {id:"footer"}, children: [
      {tag: "span", attrs: {id:"todo-count"}, children: [
        {tag: "strong", attrs: {}, children: [ctrl.list.length, " item",ctrl.list.length > 1 ? 's' : '', " left"]}
      ]},
      {tag: "ul", attrs: {id:"filters"}, children: [
        {tag: "li", attrs: {className:"selected"}, children: [
          {tag: "a", attrs: {href:"#/"}, children: ["All"]}
        ]},
        {tag: "li", attrs: {}, children: [
          {tag: "a", attrs: {href:"#/active"}, children: ["Active"]}
        ]},
        {tag: "li", attrs: {}, children: [
          {tag: "a", attrs: {href:"#/completed"}, children: ["Completed"]}
        ]}
      ]},
      clearCompleted
    ]}
  ]}
}

module.exports = view