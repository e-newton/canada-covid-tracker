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
    {value: 'canada', label: 'Canada', population: 37590000},
    {value: 'BC', label: 'British Columbia', population: 5071000},
    {value: 'AB', label: 'Alberta', population: 4371000},
    {value: 'MB', label: 'Manitoba', population: 1369000},
    {value: 'NB', label: 'New Brunswick', population: 776827},
    {value: 'NL', label: 'Newfoundland and Labrador', population: 521542},
    {value: 'NT', label: 'Northwest Territories', population: 44826},
    {value: 'NS', label: 'Nova Scotia', population: 971395},
    {value: 'NU', label: 'Nunavut', population: 38780},
    {value: 'ON', label: 'Ontario', population: 14570000},
    {value: 'PE', label: 'Prince Edward Island', population: 156947},
    {value: 'QC', label: 'Quebec', population: 8485000},
    {value: 'SK', label: 'Saskatchewan', population: 1174000},
    {value: 'YT', label: 'Yukon', population: 35874},
  ];
  constructor(props) {
    super(props);
    this.state = {currentProv: this.province_codes[0], data: {}}
    void this.getData(this.state.currentProv);
    document.title = `You clicked ${this.state.currentProv.value} times`;
    this.defaultOption = this.state.currentProv;
    this.chartRef = createRef();
    this.chartOptions =  {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Percent of Total Population'
          },

          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return value + '%';
            }
          }
        }]
      }
    }

  }

  _onSelect = (prov) => {

    console.log('priv', prov);
    this.setState({currentProv: prov})
    this.province_codes.forEach(province => {
      if(province.value === prov.value){
        void this.getData(province);
      }
    });

  }

  async getData(prov) {
    const url = `https://api.opencovid.ca/timeseries?loc=${prov.value}&stat=avaccine`
    const response = await fetch(url);
    const data = await response.json();
    console.log('days', data.avaccine);
    const labels = []
    const vacData = []
    const dayData = []
    data.avaccine.forEach(day => {
      labels.push(day.date_vaccine_administered)
      vacData.push((day.cumulative_avaccine/prov.population)*100)
      dayData.push((day.avaccine/prov.population)*100)
    })
    console.log(labels, vacData)
    const dataState = {
        labels: labels,
        yAxisID: "Percent of Total Population",
        datasets: [{label: 'Total Vaccinated', backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: vacData},
          {label: 'Vaccinated that Day', backgroundColor: 'rgb(255, 256, 132)',
            borderColor: 'rgb(255, 256, 132)',
            data: dayData}]}
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
                      <Line ref={this.chartRef} data={this.state.data} options={this.chartOptions}/>
          </header>
        </div>
    );
  }
}

export default App;
