import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      birthDate: "",
      agreeTobeContacted: false,
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClear(e) {
    this.setState({
      name: "",
      email: "",
      birthDate: "",
      agreeTobeContacted: false,
    });
  }
  handleCheckBox(e) {
    this.setState((prevState) => ({
      agreeTobeContacted: !prevState.agreeTobeContacted,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, birthDate, agreeTobeContacted } = this.state;
    const letters = /^[a-zA-Z ]+$/;
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    const birth = Date.parse(birthDate);
    const todayDate = Date.parse(today);

    if (name.length === 0) {
      alert("Please type your name");
    } else if (!name.match(letters)) {
      alert("Only use letters");
    } else if (email.length === 0) {
      alert("Please type your email");
    } else if (!validEmail.test(email)) {
      alert("Please type a correct email");
    } else if (agreeTobeContacted === false) {
      alert("Must agree to be contacted via email to submit form");
    } else if (birth > todayDate) {
      alert("Select a correct birth date");
    } else {
      axios
        .post(
          "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
          {
            name: name,
            email: email,
            birthDate: birthDate,
            emailConsent: agreeTobeContacted,
          }
        )
        .then((res) => {
          res.status(200);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  }

  render() {
    const { name, email, birthDate, agreeTobeContacted } = this.state;
    return (
      <Wrapper>
        <h2>Contact Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <Input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email
            <Input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Birthdate
            <Input
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
          I agree to be contacted via email.
          <Buttons
            type="button"
            value="clear"
            onClick={this.handleClear}
          ></Buttons>
          <Buttons type="submit" value="Submit" />
        </form>
      </Wrapper>
    );
  }
}

export default ContactUs;

const Wrapper = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 25px;
  border: 1px solid lightgrey;
  margin: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
`;

const Buttons = styled.input`
  background-color: blue;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
`;
