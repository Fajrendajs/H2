import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo';
import ProfilePage from './ProfilePage';
import { Button } from 'antd';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
    /*
    const updatedList = this.state.result.filter(item => item.objectID !== id);
    this.setState({
      result: updatedList
    });
    */
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log('greska'));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    /*
    console.log('did setSearchTopStories');
    this.setState({ result });
    console.log(this.state.result);
*/

    const { hits, page } = result;
    const { searchKey, results } = this.setState;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];
    console.log('hits: ', hits);
    console.log('oldHits: ', oldHits);
    console.log('updated hits: ', updatedHits);
    this.setState({
      results: {
        ...results,
        hits: updatedHits,
        page
      }
    });
    console.log('this.state.results: ', this.state.results);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    console.log('did mount');
    this.fetchSearchTopStories(searchTerm);
  }
  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

      console.log('list: ', list);
      console.log('page: ', page);


    if (!results) return null;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
          >
            Search{' '}
          </Search>
        </div>
        <Table list={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          <Button
            style={{ backgroundColor: '#52c41a', color: 'white' }}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            {' '}
            More
          </Button>
        </div>
        <ToDo />
        <ProfilePage user="test" />
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} value={value} />
    <button>{children}</button>
  </form>
);

function Table({ list, onDismiss }) {
  //const { link, pattern, onDismiss } = this.props;
  return (
    <div className="table">
      {list.map(item => (
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
