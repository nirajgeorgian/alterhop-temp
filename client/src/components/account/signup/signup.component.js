import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  FormGroup,
  InputGroup,
  Spinner,
  Icon,
  Tooltip,
  Button,
  Intent,
  Position,
  Toaster
} from "@blueprintjs/core";
import { userSignupStartAction } from "../../../actionCreator/user.action.creator";
import { resetUser } from "../../../actionCreator/user.action.creator";
import "./signup.style.css";

export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
  canEscapeKeyClear: true,
  autoFocus: true
});
class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    helpers: {
      showPassword: false,
      loading: false,
      disabled: false
    }
  };

  handleLockClick = event => {
    this.setState((prevState, prevProps) => {
      return {
        helpers: {
          showPassword: !prevState.helpers.showPassword
        }
      };
    });
  };

  showToast = message => {
    AppToaster.show({
      message,
      onDismiss: () => this.props.resetUser()
    });
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const params = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    await this.props.userSignupStartAction(this.state);
    this.setState({
      email: "",
      username: "",
      password: ""
    });
  };

  render() {
    const { error } = this.props.user;
    const { showPassword, loading, disabled } = this.state.helpers;
    const lockButton = (
      <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
        <Button
          icon={showPassword ? "unlock" : "lock"}
          intent={Intent.WARNING}
          minimal={true}
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );
    if (error.length && !this.props.loading) {
      this.showToast(error);
    }
    return (
      <div className="main">
      <center>
        <div className="alt-main">
          <div className="alt-imgs  ">
            
          </div>
          <div className="alt-form">
            <div className="alt-text">JOIN US</div>
            <FormGroup intent="primary">
              <InputGroup
                id="email"
                className="bp3-round"
                large={true}
                placeholder="Email ..."
                leftIcon="paperclip"
                type="email"
                onChange={this.onInputChange}
              />
              <InputGroup
                id="username"
                className="bp3-round"
                large={true}
                placeholder="Username ..."
                leftIcon="user"
                onChange={this.onInputChange}
              />
              <InputGroup
                id="password"
                className="bp3-round"
                large={true}
                placeholder="Password..."
                rightElement={lockButton}
                leftIcon="key"
                type={showPassword ? "text" : "password"}
                onChange={this.onInputChange}
              />
              <button
              className="signup-btn btn-signup"
                id="sign"
                disabled={this.props.loading ? true : false}
                onClick={this.onFormSubmit}
              >
                SIGN UP{" "}
              </button>
              <br /><br />
              <div className="foot">
                Or have an account ! <Link to="/account/login">Log In</Link>
              </div>
            </FormGroup>
          </div>
        </div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ userSignupStartAction, resetUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
