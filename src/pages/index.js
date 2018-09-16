import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login/login";
import SignUp from "./SignUp/signUp";
import TodoList from "./TodoList/todoList";
import CreateTodo from "./CreateTodo/createTodo";

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/todo-list" component={TodoList} />
      <Route path="/create-todo" component={CreateTodo} />
    </Switch>
  </BrowserRouter>
);

export { Routers };
