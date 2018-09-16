import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./login";

window.sessionStorage.getItem = jest.fn(() =>
  JSON.stringify({ user: { email: "", password: "" } })
);

jest.mock("react-router-dom");
jest.mock("react-bootstrap");

it("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
