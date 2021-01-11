import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChartComp from "./components/chartComp";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
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
    this.state = {currentProv: this.province_codes[0], vacdata: {}, caseData: {}}
    void this.getData(this.state.currentProv);
    document.title = `You clicked ${this.state.currentProv.value} times`;
    this.defaultOption = this.state.currentProv;



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

  componentDidMount() {
    this.province_codes.forEach(prov => {
      void fetch(`https://api.opencovid.ca/timeseries?loc=${prov.value}&stat=avaccine|cases`);
    })
  }

  async getData(prov) {
    const url = `https://api.opencovid.ca/timeseries?loc=${prov.value}&stat=avaccine|cases`
    const response = await fetch(url);
    const data = await response.json();
    console.log('days', data.cases);
    const labels = []
    const vacData = []
    const dayData = []
    const caseData = []
    const caseDayData = []
    const caseLabels = []
    data.avaccine.forEach((day, i) => {
      labels.push(day.date_vaccine_administered)
      vacData.push(((day.cumulative_avaccine/prov.population)*100).toFixed(2))
      dayData.push(((day.avaccine/prov.population)*100).toFixed(2))
    })
    data.cases.forEach((day, i) => {
      if(i % 4 === 0){
        caseData.push(((day.cumulative_cases/prov.population)*100).toFixed(2))
        caseDayData.push(((day.cases/prov.population)*100).toFixed(2))
        caseLabels.push(day.date_report)
      }

    })
    console.log(labels, vacData)
    const caseState = {
      labels: caseLabels,
      yAxisID: "Percent of Total Population",
      datasets: [{label: 'Total Cases', backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        data: caseData},
       ]}
    const dataState = {
        labels: labels,
        yAxisID: "Percent of Total Population",
        datasets: [{label: 'Total Vaccinated', backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        data: vacData},
          {label: 'Vaccinated that Day',
            color: 'rgb(255, 256, 132)',
            backgroundColor: 'rgba(255, 256, 132, 0.2)',
            borderColor: 'rgb(255, 256, 132)',
            data: dayData}]}
    this.setState({vacdata: dataState, caseData: caseState})
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.currentProv.value} times`;
  }



  render() {



    return (
        <div className="App container-xl">
          <header className="App-header">
            <Dropdown options={this.province_codes} onChange={this._onSelect} value={this.defaultOption} controlClassName={'control'}/>
                      <div className={'row g- justify-content-between w-100'}>
                        <div className={'col-5 d-flex flex-column justify-content-center text-center'}>
                          <h2>Vaccine Data</h2>
                          <ChartComp data = {this.state.vacdata}/>
                        </div>
                        <div className={'col-5 d-flex flex-column justify-content-center text-center'}>
                          <h2>Cases</h2>
                          <ChartComp data = {this.state.caseData}/>
                        </div>
                      </div>
          </header>
        </div>
    );
  }
}

export default App;
