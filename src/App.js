import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChartComp from "./components/chartComp";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


class App extends React.Component {
  province_codes = [
    {value: 'BC', label: 'British Columbia'},
    {value: 'AB', label: 'Alberta'},
    {value: 'MB', label: 'Manitoba'},
    {value: 'NB', label: 'New Brunswick'},
    {value: 'NL', label: 'Newfoundland and Labrador'},
    {value: 'NT', label: 'Northwest Territories'},
    {value: 'NS', label: 'Nova Scotia'},
    {value: 'NU', label: 'Nunavut'},
    {value: 'ON', label: 'Ontario'},
    {value: 'PE', label: 'Price Edward Island'},
    {value: 'QC', label: 'Quebec'},
    {value: 'SK', label: 'Saskatchewan'},
    {value: 'YT', label: 'Yukon'},
  ];
  constructor(props) {
    super(props);
    this.state = {currentProv: {value: 'BC', label: 'British Columbia'}}
    this.defaultOption = this.state.currentProv;
  }

  _onSelect = (prov) => {
    this.setState({currentProv: prov})
  }


  render() {





    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Dropdown options={this.province_codes} onChange={this._onSelect} value={this.defaultOption}
                      placeholder="Select an option"/>;
            <ChartComp prov={this.state.currentProv.value}/>
          </header>
        </div>
    );
  }
}

export default App;
