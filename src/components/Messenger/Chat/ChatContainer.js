import React, { Component } from "react";
import PropTypes from "prop-types";

import * as api from "../../../api/message";
import Chat from "./Chat";

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.fetchMessages(this.props.match.params.username);
  }

  fetchMessages = username => {
    this.setState({ messages: [] });
    setTimeout(() => {
      api.fetchMessages(username).then(messages => {
        this.setState({ messages });
      });
    }, 1000);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.fetchMessages(nextProps.match.params.username);
    }
  }

  render() {
    const { messages } = this.state;
    const { match } = this.props;

    return <Chat messages={messages} match={match} />;
  }
}

ChatContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default ChatContainer;
