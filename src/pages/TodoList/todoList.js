import React, { Component } from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";

// css
import "./todoList.css";

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "incomplete",
      user: JSON.parse(sessionStorage.getItem("todoUser")),
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      showCompleted: false,
      showIncomplete: true,
      showDeleted: false
    };
  }

  deleteTodo = id => {
    const todos = this.state.todos.map(todo => {
      if (id === todo.id) return { ...todo, status: "deleted" };
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    this.setState({ todos });
  };

  filterTodo = status => {
    this.setState({ status });
    if (status === "incomplete") {
      this.setState({
        showDeleted: false,
        showCompleted: false,
        showIncomplete: true
      });
    } else if (status === "completed") {
      this.setState({
        showDeleted: false,
        showCompleted: true,
        showIncomplete: false
      });
    } else {
      this.setState({
        showDeleted: true,
        showCompleted: false,
        showIncomplete: false
      });
    }
  };

  renderFilter = () => {
    return (
      <FormControl
        componentClass="select"
        className="filter"
        value={this.state.status}
        onChange={e => this.filterTodo(e.target.value)}
      >
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
        <option value="deleted">Deleted</option>
      </FormControl>
    );
  };

  renderListItem = todo => {
    return (
      <div className="todo-item" key={todo.id}>
        <span>{todo.title}</span>
        <span className="todo-action">
          <Button
            bsStyle="success"
            onClick={() =>
              this.props.history.push({
                pathname: "/create-todo",
                state: {
                  todo,
                  index: todo.id
                }
              })
            }
          >
            Edit
          </Button>
          <Button bsStyle="danger" onClick={() => this.deleteTodo(todo.id)}>
            Delete
          </Button>
        </span>
      </div>
    );
  };

  renderList = () => {
    const completed = this.state.todos.filter(
      todo => todo.status === "completed"
    );
    const incomplete = this.state.todos.filter(
      todo => todo.status === "incomplete"
    );
    const deleted = this.state.todos.filter(todo => todo.status === "deleted");
    const { showCompleted, showDeleted, showIncomplete } = this.state;
    return (
      <div>
        {completed.length > 0 &&
          showCompleted && (
            <ListGroup>
              <h3>Completed</h3>
              {completed.map(todo => this.renderListItem(todo))}
            </ListGroup>
          )}
        {incomplete.length > 0 &&
          showIncomplete && (
            <ListGroup>
              <h3>Incomplete</h3>
              {incomplete.map(todo => this.renderListItem(todo))}
            </ListGroup>
          )}
        {deleted.length >= 0 &&
          showDeleted && (
            <ListGroup>
              <h3>Deleted</h3>
              {deleted.map(todo => this.renderListItem(todo))}
            </ListGroup>
          )}
      </div>
    );
  };

  render() {
    if (this.state.user === null) {
      return <Redirect to={"/"} replace />;
    }
    return (
      <div className="list-page-container">
        <section className="list-action-container">
          {this.renderFilter()}
          <Button onClick={() => this.props.history.push("/create-todo")}>
            Add Todo
          </Button>
        </section>
        <section className="list-container">{this.renderList()}</section>
      </div>
    );
  }
}

export default withRouter(TodoList);
