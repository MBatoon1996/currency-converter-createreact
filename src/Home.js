import React from 'react';
//import { Link } from "react-router-dom";
import Chart from 'chart.js';
import { json, checkStatus } from './utils';
import TableRow from './TableRow';


class RateGetter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            base: 'USD',
            conv: 'JPY',
            amount: '0',
            rates: [],
            conversion: '',
            convString: '',
            error: '',
        };

        

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeConv = this.handleChangeConv.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchRates = this.switchRates.bind(this);

        this.chartRef = React.createRef();
        
    }
    componentDidMount(){
        const { base, conv } = this.state;
        this.calculate();
        this.getHistoricalRates(base, conv);
    }
    calculate = () => {
        let{ base, conv, amount } = this.state;
            fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then(checkStatus)
            .then(json)
            .then(data => {
                if (data.rates) {
                    console.log(data);
                    this.setState({ 
                        rates: data.rates,
                        conversion: amount * data.rates[this.state.conv] + ' ' + conv,
                        convString: amount + ' ' + base + ' with conversion rate of ' + data.rates[this.state.conv] + ' is:',
                        error: ''
                    });
                    console.log(this.state.rates);
                    console.log(this.state.rates[this.state.conv]);
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
    };
    handleChange(event) {
        this.setState({ base: event.target.value });
        this.getHistoricalRates(event.target.value, this.state.conv);
    }
    handleChangeConv(event) {
        this.setState({ conv: event.target.value });
        this.getHistoricalRates(this.state.base, event.target.value);
    }
    handleChangeAmount(event) {
        this.setState({ amount: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.calculate();
    }
    switchRates(event){
        console.log("Switching " + this.state.base + " and " + this.state.conv);
        let temp = this.state.base;
        this.setState({
            base: this.state.conv,
            conv: temp
        });
    }

    getHistoricalRates = (base, conv) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        fetch(`https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${conv}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            if(data.error) {
                throw new Error(data.error);
            }
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[conv]);
            const chartLabel = `${base}/${conv}`;
            this.buildChart(chartLabels, chartData, chartLabel);
        })
        .catch(error => console.error(error.message));
    }

    buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");

        console.log("building chart");

        if(typeof this.chart !== "undefined") {
            this.chart.destroy();
        }

        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: label,
                        data,
                        fill: false,
                        tension: 0,
                    }
                ]
            },
            options: {
                responsive: true,
            }
        })
    }


    render() {
        const {base, conv, amount, rates, conversion, convString, error} = this.state;
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" step="0.01" onChange={this.handleChangeAmount} className="form-control" id="amount" placeholder="0.0"></input>
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="baseCurrency">From</label>
                        <select value={base} onChange={this.handleChange} className="form-control" id="baseCurrency">
                            <option>USD</option>
                            <option>JPY</option>
                            <option>CAD</option>
                            <option>HKD</option>
                            <option>SGD</option>
                            <option>KRW</option>
                        </select>

                        <button type="button" onClick={this.switchRates} className="btn btn-secondary d-block mt-2" id="button">Switch</button>

                        <label htmlFor="convCurrency">To</label>
                        <select value={conv} onChange={this.handleChangeConv} className="form-control" id="convCurrency">
                            <option>USD</option>
                            <option>JPY</option>
                            <option>CAD</option>
                            <option>HKD</option>
                            <option>SGD</option>
                            <option>KRW</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary d-inline btn-lg mb-3" id="convertButton">Convert</button>
                </div>
            </form>
            <p>{convString}</p>
            <h2 className="mb-3">{conversion}</h2>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Currency</th>
                        <th scope="col">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRow base={ "USD" } amount={ rates.USD }/>
                    <TableRow base={ "JPY" } amount={ rates.JPY }/>
                    <TableRow base={ "CAD" } amount={ rates.CAD }/>
                    <TableRow base={ "HKD" } amount={ rates.HKD }/>
                    <TableRow base={ "SGD" } amount={ rates.SGD }/>
                    <TableRow base={ "KRW" } amount={ rates.KRW }/>
                </tbody>
            </table>
            <canvas ref={this.chartRef} />
        </div>
        )
    }
}
export default RateGetter;