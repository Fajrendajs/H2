import React, { Component } from 'react';
import { Input, List, Icon } from 'antd';

// Don't forget to include the CSS styles for antd!
import 'antd/dist/antd.css';

export default class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoItem: ''
    };
  }

  handlePressEnter = e => {
    const todo = {
      index: this.state.todos.length,
      content: e.target.value
    };

    const newTodos = this.state.todos.concat(todo);

    this.setState({
      todos: newTodos,
      todoItem: ''
    });
  };

  handleOnChange = e => {
    this.setState({
      todoItem: e.target.value
    });
  };

  render() {
    const { todoItem } = this.state;
    return (
      <div className="todoContainer">
        <h1>TODO App</h1>
        <Input
          value={todoItem}
          placeholder="What needs to be done"
          onPressEnter={this.handlePressEnter}
          onChange={this.handleOnChange}
        />
        <List
          locale={{ emptyText: 'No todo items' }}
          dataSource={this.state.todos}
          renderItem={item => (
            <TodoItem todo={item} removeTodo={this.removeTodo} />
          )}
        />
      </div>
    );
  }
}

class TodoItem extends Component {
  remove = e => {
    this.props.removeTodo(this.todo.index);
  };

  render() {
    return (
      <List.Item
        actions={[
          <Icon type="close-circle" theme="filled" onClick={this.remove} />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}
