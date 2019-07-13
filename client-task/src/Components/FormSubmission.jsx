import React, { Component } from 'react';

import './FormBuilder.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Navbar from './Navbar.jsx';

export default class FormSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submissionForms: [],
      formID: this.props.location.someState
        ? this.props.location.someState.formID
        : undefined,
      submissionFormId: [],
      newsubmissionFormId: [],
    };
  }
  async componentDidMount() {
    await this.formsSubmissionFromServer();
  }

  formsSubmissionFromServer = async e => {
    await fetch(`http://localhost:5000/submission/${this.state.formID}`)
      .then(response => response.json())
      .then(submissionFormId => {
        submissionFormId.map(oneFormId => {
          this.setState({
            submissionFormId: [
              ...this.state.submissionFormId,
              oneFormId.formSubmissionID,
            ],
          });
        });
      })
      .catch(error => console.error(error));
    await fetch(`http://localhost:5000/submission/`)
      .then(response => response.json())
      .then(submissionForms => {
        this.state.submissionFormId.forEach(oneSubFormId => {
          let onlyForForm = submissionForms.filter(oneInputSubForm => {
            return oneInputSubForm.formSubmissionID == oneSubFormId;
          });
          this.setState({
            submissionForms: [...this.state.submissionForms, onlyForForm],
          });
        });
      })
      .catch(error => console.error(error));
  };
  render() {
    return (
      <div>
        <Navbar title="Form Submission" />

        {this.state.submissionForms.map((oneForm, index) => {
          return (
            <Card>
              {oneForm.map((oneField, i) => {
                return (
                  <div>
                    {oneField.inputName}:{oneField.fieldValue}
                  </div>
                );
              })}
            </Card>
          );
        })}
        <Link to="/">back</Link>
      </div>
    );
  }
}
