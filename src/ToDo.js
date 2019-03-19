import React, { Component } from 'react';
import { Input, List, Icon, DatePicker } from 'antd';

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
      content: e.target.value,
      date: null,
      dateString: ''
    };

    const newTodos = this.state.todos.concat(todo);

    this.setState({
      todos: newTodos,
      todoItem: ''
    });
  };

  setDate = (index, date, dateString) => {
    let newTodos = [...this.state.todos];
    newTodos[index].date = date;
    newTodos[index].dateString = dateString;

    this.setState({
      todos: newTodos
    });
  };

  handleOnChange = e => {
    this.setState({
      todoItem: e.target.value
    });
  };

  removeTodo = index => {
    let newTodos = [...this.state.todos];

    // Remove element
    newTodos.splice(index, 1);

    // Decrement greater indexes
    for (let i = index; i < newTodos.length; i++) {
      newTodos[i].index -= 1;
    }

    // Update state
    this.setState({
      todos: newTodos
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
            <TodoItem
              todo={item}
              removeTodo={this.removeTodo}
              setDate={this.setDate}
            />
          )}
        />
      </div>
    );
  }
}

class TodoItem extends Component {
  remove = e => {
    this.props.removeTodo(this.props.todo.index);
  };

  handleDateChange = (date, dateString) => {
    this.props.setDate(this.props.todo.index, date, dateString);
  };

  render() {
    return (
      <List.Item
        actions={[
          <DatePicker
            format="DD/MM/YYYY"
            onChange={this.handleDateChange}
            value={this.props.todo.date}
          />,
          <Icon type="close-circle" theme="filled" onClick={this.remove} />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}
