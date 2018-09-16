import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect, Link, withRouter } from "react-router-dom";

// css
import "./login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: JSON.parse(sessionStorage.getItem("todoUser"))
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.history.push("/todo-list");
  };

  _renderForm() {
    return (
      <div className="wrapper">
        <div className="login-heading">Login</div>
        <div className="top-content">
          <form onSubmit={this.onFormSubmit}>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                placeholder="●●●●●●●"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <div className="action-group">
              <Button type="submit" bsStyle="primary" className="button">
                LOGIN
              </Button>
              <Button bsStyle="primary" className="button">
                <Link className="custom-link" to="/signup">
                  SIGNUP
                </Link>
              </Button>
            </div>
            <br />
          </form>
        </div>
        <div className="bottom" />
      </div>
    );
  }

  render() {
    if (this.state.user !== null) {
      return <Redirect to={"/todo-list"} replace />;
    }
    return <div className="container">{this._renderForm()}</div>;
  }
}

export default withRouter(Login);
