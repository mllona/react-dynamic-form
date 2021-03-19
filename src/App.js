import React from 'react';
import formData from './exampleData';
const { fields: formFields } = formData;

class Form extends React.Component {
  // Initializes the state object to contain an empty string for
  // each field in the form, and binds all internal functions.
  // State object example:
  // {
  //   "first_name": "",
  //   "last_name": "",
  //   "email": "",
  //   "phone_number": "",
  //   "job_title": "",
  //   "date_of_birth": "",
  //   "parental_consent": ""
  // }
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

  // Handles all form changes by setting the state of a given
  // form field to the value entered by the user.
  // If the date field is changed, calls the handleParentalConsent
  // function to choose whether to display the parental consent
  // checkbox.
  handleChange(event) {
    const stateObj = {};
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
    if (event.target.type === 'date') {
      this.handleParentalConsent(event);
    }
  }

  // When the user submits the form, logs all form items and values,
  // prevents the form from clearing, and returns the state object.
  handleSubmit(event) {
    console.log('Form was submitted: ', this.state);
    event.preventDefault();
    return this.state;
  }

  // When the Date of Birth field is updated, checks if the date entered
  // is less than 13 years prior to today's date. If it is, removes the
  // 'd-none' class, telling bootstrap to display the div containing the
  // parental consent checkbox. If the date is subsequently changed to be
  // greater than 13 years ago, re-hides the checkbox.
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

  // Generatess an input element given a field.
  generateInputElement(field, i) {
    // Checks if the field has a conditional element (indicating that
    // it shouldn't be displayed immediately). If so, sets a variable
    // to 'd-none' to be added as a class later.
    const isConditional = field.hasOwnProperty('conditional');
    let hidden = '';
    if (isConditional) {
      hidden = 'd-none';
    }
    // Sets the class for displaying inputs. For a checkbox field,
    // sets a different class than all other fields.
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

  // Creates the form and submit button; generates one form input
  // element per field provided in exampleData.json.
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
