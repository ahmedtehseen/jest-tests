import React from "react";
import ReactDOM from "react-dom";
import { CreateTodo } from "./createTodo";

window.sessionStorage.getItem = jest.fn(() =>
  JSON.stringify({ user: { email: "", password: "" } })
);

window.localStorage.getItem = jest.fn(() =>
  JSON.stringify([
    {
      description: "",
      id: "",
      status: "",
      title: ""
    }
  ])
);

jest.mock("react-router-dom");
jest.mock("react-bootstrap");

it("SignUp renders without crashing", () => {
  const div = document.createElement("div");
  const location = {
    state: {
      todo: {
        description: "",
        id: "",
        status: "",
        title: ""
      }
    }
  };
  ReactDOM.render(<CreateTodo location={location} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
