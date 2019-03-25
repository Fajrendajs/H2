import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo';
import ProfilePage from './ProfilePage';
import { Button } from 'antd';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.result.filter(item => item.objectID !== id);
    this.setState({
      result: updatedList
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    console.log('did setSearchTopStories');
    this.setState({ result });
    console.log(this.state.result);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    console.log('did mount');
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log('greska'));
  }
  render() {
    const { result, searchTerm } = this.state;

    if (!result) return null;

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search{' '}
          </Search>
        </div>
        <Table
          result={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <ToDo />
        <ProfilePage user="test" />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input type="text" onChange={onChange} value={value} />
  </form>
);

function Table({ result, pattern, onDismiss }) {
  //const { link, pattern, onDismiss } = this.props;
  return (
    <div className="table">
      {result.filter(isSearched(pattern)).map(item => (
        <div key={item.objectID} className="table-row">
          <li>
            <span style={{ width: '40%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '10%' }}>{item.num_comments}</span>
            <span style={{ width: '10%' }}>{item.num_comments}</span>
            <span style={{ width: '10%' }}>
              <Button
                type="primary"
                value="small"
                className="button-inline"
                onClick={() => onDismiss(item.objectID)}
              >
                Dismiss
              </Button>
            </span>
          </li>
        </div>
      ))}
    </div>
  );
}

const IButton = ({ onClick, className = '', children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
