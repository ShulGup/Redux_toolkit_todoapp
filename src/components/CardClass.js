import React, { Component } from "react";

export default class CardClass extends Component {
  state = { user: "" };

  componentDidMount() {
    let user = this.props.match.params.user;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <p>hello {user}</p>
      </>
    );
  }
}
