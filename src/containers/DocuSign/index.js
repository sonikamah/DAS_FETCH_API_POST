
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';

import * as Actions from './actions';

class DocuSignPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.addEventListener("message", this.handleFrameTasks);
    }
    
    componentWillUnmount() {
        window.removeEventListener("message", this.handleFrameTasks);
    }

    //  handleFrameTasks = (e) => {
    //     if(e.data.from.iframe === "load_products") {
    //         console.log("Successfully Signed")
    //     }
    // }

    handleSubmit() {
        this.props.getESignData();
    }

    render() {
        let url = this.props.eSignUrl
       
        // var url = "https://demo.docusign.net/Signing/startinsession.aspx?t=ad15425c-d6ed-4d57-b4bc-89b1b2cf1b8e"

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