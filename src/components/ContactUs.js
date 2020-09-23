import React, { Component, Fragment } from "react";

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      birthDate: "",
      agreeTobeContacted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleClear(e) {
    this.setState(
      {
        name: "",
        email: "",
        birthDate: "",
        agreeTobeContacted: false,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  handleCheckBox(e) {
    this.setState((prevState) => ({
      agreeTobeContacted: !prevState.agreeTobeContacted,
    }));
  }

  handleSubmit(e) {
    console.log("clicked");
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { name, email, birthDate, agreeTobeContacted } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Birthdate
            <input
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="checkbox"
            name="checkbox"
            value={agreeTobeContacted}
            onChange={this.handleCheckBox}
          />
          I agree to be contacted bia email.
          <input type="button" value="clear" onClick={this.handleClear}></input>
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}

export default ContactUs;
