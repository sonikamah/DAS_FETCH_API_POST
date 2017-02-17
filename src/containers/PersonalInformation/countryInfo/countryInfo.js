import React, { Component } from 'react';
import countryList from './countryList.json';

class CountryInfo extends Component {
	render() {
		return (
			<div>
				<div>
					<label className="custom-label">Country of Citizenship</label>
					<select className="custom-select bm-type_white">
						<option>Select a Country</option>
						{Object.keys(countryList).map((key, index) => {
							return <option value={key} key={index}>{countryList[key]}</option>;
						})}
					</select>
				</div>
				<div>
					<label className="custom-label">Country of Tax Residence</label>
					<select className="custom-select bm-type_white">
						<option>Select a Country</option>
						{Object.keys(countryList).map((key, index) => {
							return <option value={key} key={index}>{countryList[key]}</option>;
						})}
					</select>
				</div>
			</div>
		);
	}
}

export default CountryInfo;