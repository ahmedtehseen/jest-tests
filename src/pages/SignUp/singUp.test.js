import React from "react";
import ReactDOM from "react-dom";
import { SignUp } from "./signUp";

window.sessionStorage.getItem = jest.fn(() =>
  JSON.stringify({ user: { email: "", password: "" } })
);

jest.mock("react-router-dom");
jest.mock("react-bootstrap");

it("SignUp renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
