import React from 'react';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
class ChartComp extends React.Component {
    constructor(props) {
        super(props);
        this.prov = props.prov;
        console.log('this.prov', this.prov)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.prov = this.props.prov;
        void this.componentDidMount()
    }

    chartRef = React.createRef();
    async componentDidMount() {
        const url = `https://api.opencovid.ca/timeseries?loc=${this.prov}&stat=avaccine`
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
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Sales",
                        data: vacData,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

    }

    render() {

        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>

        );
    }
}

export default ChartComp;
