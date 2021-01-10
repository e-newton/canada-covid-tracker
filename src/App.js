import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChartComp from "./components/chartComp";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Chart from "chart.js";
import {createRef} from "react/cjs/react.production.min";
import {Line} from "react-chartjs-2";


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
    this.state = {currentProv: {value: 'BC', label: 'British Columbia'}, data: {}}
    void this.getData(this.state.currentProv);
    document.title = `You clicked ${this.state.currentProv.value} times`;
    this.defaultOption = this.state.currentProv;
    this.chartRef = createRef();
  }

  _onSelect = (prov) => {
    console.log('priv', prov);
    this.setState({currentProv: prov})
    void this.getData(prov);
  }

  async getData(prov) {
    const url = `https://api.opencovid.ca/timeseries?loc=${prov.value}&stat=avaccine`
    const response = await fetch(url);
    const data = await response.json();
    console.log('days', data.avaccine);
    const labels = []
    const vacData = []
    data.avaccine.forEach(day => {
      labels.push(day.date_vaccine_administered)
      vacData.push((day.cumulative_avaccine/5071000)*100)
    })
    console.log(labels, vacData)
    const dataState = {labels: labels, datasets: [{label: 'Vaccine', backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: vacData}]}
    this.setState({data: dataState})
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.currentProv.value} times`;
  }



  render() {



    return (
        <div className="App">
          <header className="App-header">
            <Dropdown options={this.province_codes} onChange={this._onSelect} value={this.defaultOption}
                      placeholder="Select an option"/>
                      <Line ref={this.chartRef} data={this.state.data}/>
          </header>
        </div>
    );
  }
}

export default App;
