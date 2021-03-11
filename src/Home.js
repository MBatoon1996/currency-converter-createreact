import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class RateGetter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            base: 'USD',
            conv: 'JPY',
            amount: '',
            rates: [],
            error: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeConv = this.handleChangeConv.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ base: event.target.value });
    }
    handleChangeConv(event) {
        this.setState({ conv: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        let{ base, conv } = this.state;
        fetch(`GET https://api.exchangeratesapi.io/latest?base=${base}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            if (data.Response === 'False') {
                throw new Error(data.Error);
            }
            if (data.Response === 'True' && data.Search) {
                console.log(data);
                this.setState({ rates: data.Search, error: ''});
            }
        })
        .catch((error) => {
            this.setState({ error: error.message });
            console.log(error);
        })
    }


    render() {
        const {base, conv, amount, rates, error} = this.state;
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-12 col-md-7">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" step="0.01" className="form-control" id="amount" placeholder="0.0"></input> {/* add onChange={this.handleChange} */}
                    </div>
                    <div className="form-group col-12 col-md-5">
                        <label htmlFor="baseCurrency">From</label>
                        <select value={base} onChange={this.handleChange} className="form-control" id="baseCurrency">
                            <option>USD</option>
                            <option>JPY</option>
                            <option>TWD</option>
                            <option>HKD</option>
                            <option>EURO</option>
                        </select>
                        <button className="btn btn-secondary d-block mt-2" id="button">Switch</button>
                        <label htmlFor="convCurrency">To</label>
                        <select value={conv} onChange={this.handleChangeConv} className="form-control" id="convCurrency">
                            <option>JPY</option>
                            <option>USD</option>
                            <option>TWD</option>
                            <option>HKD</option>
                            <option>EURO</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary d-inline btn-lg" id="convertButton">Convert</button>
                </div>
            </form>
        </div>
        )
    }
}
export default RateGetter;