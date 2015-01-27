// JSX version of https://github.com/jpmonette/todomvc-mithril/blob/1d627f1d5dc0890d0a99cdcb16d09387f68f6df0/js/views/todo-view.js

'use strict';

function view(ctrl) {
  var clearCompleted
  if (ctrl.amountCompleted() != 0) {
    clearCompleted = <button id="clear-completed" onclick={ctrl.clearCompleted.bind(ctrl)}>
      Clear completed ({ctrl.amountCompleted()})
    </button>
  }

  var todos = ctrl.list.map((task, index) => <li className={task.completed() && 'completed'}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onclick={m.withAttr('checked', task.completed)}
        checked={task.completed()}
      />
      <label>{task.title()}</label>
      <button className="destroy" onclick={ctrl.remove.bind(ctrl, index)}/>
    </div>
    <input className="edit"/>
  </li>)

  return <div id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input
        id="new-todo"
        placeholder='What needs to be done?'
        onkeydown={function(e) { m.withAttr('value', ctrl.title)(e); ctrl.add(ctrl.title, e) }}
        value={ctrl.title()}
      />
    </header>
    <section id="main">
      <input id="toggle-all" type="checkbox"/>
      <ul id="todo-list">
        {todos}
      </ul>
    </section>
    <footer id="footer">
      <span id="todo-count">
        <strong>{ctrl.list.length} item{ctrl.list.length > 1 ? 's' : ''} left</strong>
      </span>
      <ul id="filters">
        <li className="selected">
          <a href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      {clearCompleted}
    </footer>
  </div>
}

module.exports = view