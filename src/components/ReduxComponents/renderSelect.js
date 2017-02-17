import React from 'react';

//Needs reafactoring to accomodate our code
const renderSelect = ({input, list, label,labelClassName, className, meta: { touched, error } }) => (
  //className to be dynamic
  <div className={className?className:'inline'}>
    {label && <label className={labelClassName}>{label}</label>}
    <select {...input}
      className={(touched && error)
        ? 'form-control control-danger'
        : 'custom-select'}>
      {list && list.map(item =>
        <option value={item.id} key={item.id} title={item.description}>{item.name}</option>)}
    </select>
    {touched && error && <span className="text-danger"><span className="fa fa-times-circle"></span>{error}</span>}
  </div>
)
export default renderSelect;