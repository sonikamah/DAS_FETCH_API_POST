/**
 * Created by muduna on 1/10/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import EventEmitter from 'events';
import * as Actions from './actions'
import Login from '../../components/Login';
import PopOver from '../../components/PopOver';


// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            popoverOpen: false,
            triggerNode: {}
        };

        // this.on('componentWillReceiveProps', () => { console.log('Yay') })
        this.toggle = this.toggle.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.hideComponent = this.hideComponent.bind(this);
    }

    authenticate(user){
        this.props.authenticate(user);
        browserHistory.push('/getStarted');
    }
    
    toggle(event) {
        event.preventDefault();

        if (!this.state.popoverOpen) {
            this.setContent();
            this.setState({
                popoverOpen: true,
                triggerNode: event.target
            });
            
            // this.eventEmitter.emit('showPopover');
        } else {
            this.hideComponent();
        }
    }

    setContent() {
        // API call or return static content
        this.setState({
            content: "Sonika"
        });
    }

    hideComponent() {
        this.setState({
            popoverOpen: false,
            triggerNode: {}
        });
    }
    
    render() {
        return (
            <div>
                <Login authenticate={this.authenticate} />
                
                <button type="button" className="qs" onClick={this.toggle}>
                    ClickMe
                </button>
                 { this.state.popoverOpen ?
                    <PopOver direction="bottom"
                        isOpen={this.state.popoverOpen} 
                        triggerNode={this.state.triggerNode} 
                        hideComponent={this.hideComponent}>
                        {this.state.content}
                    </PopOver> : null }
            </div>
        )
    }
}

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);