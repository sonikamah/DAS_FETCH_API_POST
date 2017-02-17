
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import validate from './validate';
import * as Actions from './actions';
import CountryInfo from './countryInfo/countryInfo';
import renderField from '../../components/ReduxComponents/renderField';
import renderSelect from '../../components/ReduxComponents/renderSelect';

var monthOptions = [];
for (var i = 0; i < 12; i++) {
  monthOptions.push({ id: i, name: moment().month(i).format('MMMM') });
}


class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.userverificationStatus = false;
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      isUSCitizen: true,
      isMailingAddressSame: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDOBChange = this.handleDOBChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: JSON.parse(event.target.value) });
  }
  handleDOBChange(date) {
    console.log("DOB changed to ", date);
  }

  determineUserVerificationStatus() {
    //maintaining user verification status
    this.userverificationStatus = JSON.parse(localStorage.getItem('isUserVerified'));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isVerIdVerified !== this.props.isVerIdVerified && this.props.isVerIdVerified === true) {
      //to store the user state. would ideally be maintained at backend.
      localStorage.setItem('isUserVerified', 'true');
      //take him to next page
      browserHistory.push('/employer')
    }
  }

  handleSubmit(values) {
    console.log("PersonalInformation", values);
    this.props.verifyWithVerId(values);
    //     moment('2017-02-29', 'YYYY-MM-DD', true).isValid(); 
    //     moment().month(i).format('MMMM')
    //     </Field>
    // <hr />
    // <h2 className="heading2 gm-align_left">Legal/Residential Address</h2>
    // <Field
    //   name="address1"
    //   component={renderField}
    //   className="multiInputContainer bm-type_singleInput"
    //   type="text"
    //   label="Address 1"
    // ></Field>
    // <Field
    //   name="address2"
    //   component={renderField}
    //   className="multiInputContainer bm-type_singleInput"
    //   type="text"
    //   label="Address 2"
    // ></Field>
    // <Field
    //   name="city"
    //   component={renderField}
    //   className="multiInputContainer bm-type_singleInput"
    //   type="text"
    //   label="City"
    // ></Field>
    // <Field
    //   name="state"
    //   className="mandatory-fields"
    //   component={renderSelect}
    //   list={monthOptions}
    //   label="Select State">
    // </Field>
    // <Field
    //   name="zipcode"
    //   component={renderField}
    //   className="multiInputContainer bm-type_singleInput"
    //   type="number"
    //   min={100}
    //   max={999}
    //   inputMode="numeric"
    //   label="Zip Code"
    //   pattern="[0-9]*">
    // </Field>
    // <Field
    //   name="zipcode"
    //   component={renderField}
    //   className="multiInputContainer bm-type_singleInput"
    //   type="number"
    //   min={100}
    //   max={999}
    //   inputMode="numeric"
    //   label="Zip Code"
    //   pattern="[0-9]*">
    // </Field>
    // <div className="gm-align_left">
    //   <label className="custom-label">Are you a U.S. citizen? </label>
    //   <div className="toggleBtn gm-display_inlineBlock">
    //     <input type="radio" id="sameAddress" value="true" name="isMailingAddressSame" checked={this.state.isMailingAddressSame} onChange={this.handleChange} /><label htmlFor="sameAddress" >Yes</label>
    //     <input type="radio" value="false" id="diffAddress" name="isMailingAddressSame" checked={!this.state.isMailingAddressSame} onChange={this.handleChange} /><label htmlFor="diffAddress">No</label>
    //   </div>
    // </div>
  }
  componentDidMount() {
    this.determineUserVerificationStatus()
    this.props.getInitialData();
  }
  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <div className="container-fluid">
        <h1 className="heading1 gm-align_left">{"We'll start with some questions about you."}</h1>
        <h4 className="heading4 gm-align_left">{"Before opening your account, federal law requires that we ask for certain information in order to verify your identity."}</h4>
        <hr />
        <p className="textn gm-align_left">All fields required unless otherwise noted.</p>
        <h2 className="heading2 gm-align_left">Personal Information</h2>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <label className="custom-label">Your Name</label>
          <Field
            name="firstName"
            component={renderField}
            className="multiInputContainer"
            type="text"
            label="First Name"
            subLevelContaner="true"
            readonly={this.userverificationStatus}>
          </Field>
          <Field
            name="lastName"
            component={renderField}
            className="multiInputContainer"
            type="text"
            label="Last Name"
            subLevelContaner="true"
            readonly={this.userverificationStatus}>
          </Field>
          <Field
            name="middleName"
            component={renderField}
            className="multiInputContainer"
            type="text"
            label="Middle Name"
            subLevelContaner="true"
            readonly={this.userverificationStatus}>
          </Field>
          <div>
            <label className="custom-label">Social Security Number</label>
            <div className="multiInputContainer bm-type_number">
              <Field
                name="ssnFirst"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                min={100}
                max={999}
                inputMode="numeric"
                pattern="[0-9]*"
                subLevelContaner="true">
              </Field>
              <span className="separator">-</span>
              <Field
                name="ssnSecond"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                min={100}
                max={999}
                inputMode="numeric"
                pattern="[0-9]*"
                subLevelContaner="true">
              </Field>
              <span className="separator">-</span>
              <Field
                name="ssnThird"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min={1000}
                max={9999}
                subLevelContaner="true">
              </Field>
            </div>
          </div>
          <div className="gm-align_left">
            <label className="custom-label">Date of Birth</label>
            <div className="gm-display_inlineBlock">
              <Field
                name="month"
                className="mandatory-fields gm-display_inlineBlock"
                component={renderSelect}
                list={monthOptions}>
              </Field>
              <span className="separator">/</span>
              <input type="text" className="custom-input bm-width_small" />
              <span className="separator">/</span>
              <span className="uneditableText">1981</span>
            </div>
          </div>
          <div className="gm-align_left">
            <label className="custom-label">Are you a U.S. citizen? </label>
            <div className="toggleBtn gm-display_inlineBlock">
              <input type="radio" id="citizen" value="true" name="isUSCitizen" checked={this.state.isUSCitizen} onChange={this.handleChange} /><label htmlFor="citizen" >Yes</label>
              <input type="radio" value="false" id="noncitizen" name="isUSCitizen" checked={!this.state.isUSCitizen} onChange={this.handleChange} /><label htmlFor="noncitizen">No</label>
            </div>
          </div>
          {!this.state.isUSCitizen && <CountryInfo />}
          <div>
            <label className="custom-label">Phone Number</label>
            <div className="multiInputContainer bm-type_number">
              <Field
                name="phoneFirst"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                subLevelContaner="true">
              </Field>
              <span className="separator">-</span>
              <Field
                name="phoneSecond"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                subLevelContaner="true">
              </Field>
              <span className="separator">-</span>
              <Field
                name="phoneThird"
                component={renderField}
                className="inline"
                customInputClassName="bm-width_small"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                subLevelContaner="true">
              </Field>
            </div>
          </div>
          <Field
            name="email"
            component={renderField}
            className="multiInputContainer bm-type_singleInput"
            type="email"
            label="Email">
          </Field>
          <button type="submit" disabled={(pristine || submitting || error)} value="Submit"
            className="custom-button">Next</button>
        </form>
      </div>
    );
  }
}
PersonalInformation.propTypes = {
  initialValues: React.PropTypes.object,
  enableReinitialize: React.PropTypes.bool
};

PersonalInformation = reduxForm({
  form: 'personalInfo',
  validate: validate
})(PersonalInformation);

const mapStateToProps = (state, ownProps) => {
  return { initialValues: state.initialData, enableReinitialize: true, isVerIdVerified: state.isVerIdVerified };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);