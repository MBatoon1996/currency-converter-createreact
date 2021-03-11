import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

export default function Home() {
    return (
        <div className="container">
            <form>
                <div className="form-row">
                    <div className="form-group col-12 col-md-7">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" step="0.01" className="form-control" id="amount" placeholder="0.00"></input> {/* add onChange={this.handleChange} */}
                    </div>
                    <div className="form-group col-12 col-md-5">
                        <label htmlFor="baseCurrency">From</label>
                        <select className="form-control" id="baseCurrency">
                        {/* add value={base} onChange={this.handleChange} */}
                            <option>USD</option>
                            <option>JPY</option>
                            <option>TWD</option>
                            <option>HKD</option>
                            <option>EURO</option>
                        </select>
                        <button className="btn btn-secondary d-block mt-2" id="button">Switch</button>
                        <label htmlFor="convCurrency">To</label>
                        <select className="form-control" id="convCurrency">
                        {/* add value={conv} onChange={this.handleChange} */}
                            <option>JPY</option>
                            <option>USD</option>
                            <option>TWD</option>
                            <option>HKD</option>
                            <option>EURO</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary d-inline btn-lg" id="convertButton">Convert</button>
                </div>
            </form>
        </div>
    )
}