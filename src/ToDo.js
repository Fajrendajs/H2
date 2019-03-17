import React, { Component } from 'react';
import { Input, List } from 'antd';

// Don't forget to include the CSS styles for antd!
import 'antd/dist/antd.css';

export default class ToDo extends Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };
  }

  handlePressEnter = e => {
    const todo = {
      index: this.state.todos.length,
      content: e.target.value
    };

    const newTodos = this.state.todos.concat(todo);

    this.setState({
      todos: newTodos
    });

    e.target.value = '';
  };

  render() {
    return (
      <div className="todoContainer">
        <h1>TODO App</h1>
        <Input
          placeholder="What needs to be done"
          onPressEnter={this.handlePressEnter}
        />
        <List
          locale={{ emptyText: 'No todo items' }}
          dataSource={this.state.todos}
          renderItem={item => <List.Item>{item.content}</List.Item>}
        />
      </div>
    );
  }
}
