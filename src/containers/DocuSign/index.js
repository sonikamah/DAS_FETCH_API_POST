
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';

import * as Actions from './actions';

class DocuSignPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.pdfBase64 = '';
    }

    componentDidMount() {
        window.addEventListener("message", this.handleFrameTasks);
        document.getElementById('filePicker').addEventListener('change', this.handleFileSelect, false);
    }
    
    // componentWillUnmount() {
    //     window.removeEventListener("message", this.handleFrameTasks);
    // }

    //  handleFrameTasks = (e) => {
    //     if(e.data.from.iframe === "load_products") {
    //         console.log("Successfully Signed")
    //     }
    // }

    handleSubmit() {
        this.props.getEnvelopeData(this.pdfBase64);
        //this.props.getESignData();
    }

    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                this.pdfBase64 = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };

    render() {
        let url = this.props.eSignUrl
       
        if(url) {
            return (<div>
                    <iframe src={url} width="800px" height="600px" onLoad={function(event){
                        if(event.target.contentDocument){
                             //browserHistory.push('/createAccount');
                        }
                    }}/>
                </div>)
        } else {
                return (<div>
                    <p>Heellloo !!  This is DocuSign POC... </p>
                        <label for="filePicker">Choose or drag a file:</label>
                        <input type="file" id="filePicker"/>
                        <div>
                            <h1>Base64 encoded version</h1>
                            <textarea id="base64textarea" placeholder="Base64 will appear here" cols="50" rows="15"></textarea>
                        </div>
                    <button onClick={this.handleSubmit}>E-Sign</button>
                </div>)
            }
    }
}


// Subscribe component to redux store and merge the state into component's props
const mapStateToProps = (state, ownProps) => ({
    eSignUrl: state.eSignUrl
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocuSignPage);