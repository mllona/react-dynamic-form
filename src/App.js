import React from 'react';
import formData from './exampleData';
const { fields: formFields } = formData;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    formFields.forEach((field) => {
      this.state[field.name] = '';
    });
    console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleParentalConsent = this.handleParentalConsent.bind(this);
    this.generateInputElement = this.generateInputElement.bind(this);
  }

  handleChange(event) {
    const stateObj = {};
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
    if (event.target.type === 'date') {
      this.handleParentalConsent(event);
    }
  }

  handleSubmit(event) {
    console.log('Form was submitted: ', this.state);
    event.preventDefault();
    return this.state;
  }

  handleParentalConsent(event) {
    const date = new Date(event.target.value);
    const now = new Date();
    const needsParentalConsent = date >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
    const input = document.getElementById('parental_consent');
    const parent = input.parentElement;
    const displayDiv = parent.parentElement;
    if (needsParentalConsent) {
      displayDiv.classList.remove('d-none');
    } else {
      displayDiv.classList.add('d-none');
    }
  }

  generateInputElement(field, i) {
    const isConditional = field.hasOwnProperty('conditional');
    let hidden = '';
    if (isConditional) {
      hidden = 'd-none';
    }
    let inputClass = 'form-control';
    if (field.type === 'checkbox') {
      inputClass = 'form-check-input';
    }
    return (
      <div key={i} className={`form-group row ${hidden}`}>
        <label htmlFor={field.name} className="col-2 col-form-label">{field.human_label}</label>
        <div className="col-10">
          <input type={field.type} className={inputClass} id={field.name} placeholder={field.human_label} onChange={this.handleChange} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <form id="mainForm" onSubmit={this.handleSubmit}>
          {formFields.map((field, i) => (
            this.generateInputElement(field, i)
          ))}
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
