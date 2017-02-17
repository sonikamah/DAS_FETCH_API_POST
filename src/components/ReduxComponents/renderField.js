import React from 'react';

// Needs to be refactored, in case needed we can create similar template instead of making is unmaintainable and readable
const renderField = ({ input, label, className, isReadonly, customInputClassName, subLevelContaner, type, values, meta: {touched, error}}) => (
  <div className={className}>
    {isReadonly+'asdsa'}
    {label && <label className={subLevelContaner ? "custom-sub-label" : "custom-label"}>{label}</label>}
    <input {...input} className={customInputClassName ? "custom-input " + customInputClassName : "custom-input"} placeholder={label} type={type} />
    {touched && error && <div className="error-message">{error} </div>}
  </div>
);

export default renderField;