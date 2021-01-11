import React, {createRef} from 'react';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import {Line} from "react-chartjs-2";

class ChartComp extends React.Component {
    chartOptions = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Percent of Total Population'
                },

                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    }

    constructor(props) {
        super(props);
        this.chartRef = createRef();
    }


    render() {

        return (
            <Line ref={this.chartRef} data={this.props.data} options={this.chartOptions}/>

        );
    }

}

export default ChartComp;
