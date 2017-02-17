
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';

import * as Actions from './actions';

class EmployerPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <button>Next</button>
            <button onClick={() => browserHistory.push('/personalInfo')}>Prev</button>
        </div>)
    }
}
EmployerPage.propTypes = {
};

// Subscribe component to redux store and merge the state into component's props
const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployerPage);