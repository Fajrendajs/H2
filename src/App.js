import React, { Component } from "react";
import "./App.css";

const link = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clarke",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const numbers = [1, 2, 3, 4, 5];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link,
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.link.filter(item => item.objectID !== id);
    this.setState({
      link: updatedList
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { link, searchTerm } = this.state;

    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} />
        <Table link={link} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input type="text" onChange={onChange} value={value} />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { link, pattern, onDismiss } = this.props;
    return (
      <div>
        {link.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID}>
            <li>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.num_comments}</span>
              <span>
                <button type="button" onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </button>
              </span>
            </li>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
