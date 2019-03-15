import React, { Component } from "react";
import "./App.css";
import Clock from "./Clock";

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
    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        {this.state.link.filter(isSearched(this.state.searchTerm)).map(item => (
          <div key={item.objectID}>
            <li>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.num_comments}</span>
              <span>
                <button
                  type="button"
                  onClick={() => this.onDismiss(item.objectID)}
                >
                  Dismiss
                </button>
              </span>
            </li>
          </div>
        ))}
        <Clock />
      </div>
    );
  }
}

export default App;
