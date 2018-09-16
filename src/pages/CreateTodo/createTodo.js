import React, { Component } from "react";
import uuid from "uuid/v4";
import {
  Form,
  FormControl,
  Button,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { isEmpty } from "lodash";
import { withRouter, Redirect } from "react-router-dom";
//css
import "./createTodo.css";

export class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(sessionStorage.getItem("todoUser")),
      status: "incomplete",
      title: "",
      description: "",
      index: null
    };
  }

  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (!isEmpty(this.props.location.state)) {
      const { status, title, description, id } = this.props.location.state.todo;
      this.setState({ status, title, description, id });
    }
  }

  submitForm = e => {
    e.preventDefault();
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (this.state.id) {
      todos = todos.map(todo => {
        if (todo.id === this.state.id)
          return {
            ...todo,
            status: this.state.status,
            title: this.state.title,
            description: this.state.description
          };
        return todo;
      });
    } else {
      todos = [
        ...todos,
        {
          id: uuid(),
          status: this.state.status,
          title: this.state.title,
          description: this.state.description
        }
      ];
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    this.props.history.push("/todo-list");
  };

  renderForm() {
    return (
      <Form horizontal onSubmit={this.submitForm}>
        {this.state.id && (
          <FormGroup controlId="status">
            <ControlLabel>Status</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.status}
              onChange={e => this.setState({ status: e.target.value })}
            >
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
              <option value="deleted">Deleted</option>
            </FormControl>
          </FormGroup>
        )}
        <FormGroup controlId="title">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            className="similar-inputs"
            type="text"
            placeholder="Title"
            onChange={this._onChange}
            value={this.state.title}
            name="title"
          />
        </FormGroup>
        <FormGroup controlId="description">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            className="similar-inputs"
            componentClass="textarea"
            placeholder="Description"
            onChange={this._onChange}
            value={this.state.description}
            name="description"
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" className="button">
            {typeof this.state.index === "number" ? "Edit" : "Create"}
          </Button>
        </FormGroup>
      </Form>
    );
  }

  render() {
    if (this.state.user === null) {
      return <Redirect to={"/"} replace />;
    }
    return <div className="create-page-container">{this.renderForm()}</div>;
  }
}

export default withRouter(CreateTodo);
