import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormBuilder.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export default class FormSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   formID:32,
      arrayValues: [],
      values: {},

      fieldInput: [],
      formID: this.props.location.someState
        ? this.props.location.someState.formID
        : 0,
    };
  }
  async componentDidMount() {
    await this.getFormField();
  }

  updateValueState = (event, i) => {
    this.state.values[i] = event.target.value;
  };
  getFormField = async e => {
    fetch(`http://localhost:5000/forms/${this.state.formID}`)
      .then(response => response.json())
      .then(fieldInput => {
        this.setState({
          fieldInput,
        });
      })
      .catch(error => console.error(error));
  };
  postFormsSubmission = async e => {
    e.preventDefault();
    console.log('postFormsSubmission');
    const obj = Object.values(this.state.values);

    this.setState({ arrayValues: obj });

    const response = await fetch(
      `http://localhost:5000/submission/${this.state.formID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
    );
    console.log(this.state.arrayValues);

    if (response.status === 200) {
      this.setState({ values: {}, arrayValues: [] });

      for (let index = 0; index < this.state.fieldInput.length; index++) {
        this.setState({ arrayValues: [...this.state.arrayValues, ''] });
      }
      console.log(this.state.values, this.state.arrayValues);

      console.log(this.state.values, this.state.arrayValues);
      console.log('added');
    } else {
      console.error('not added!');
    }
  };
  render() {
    return (
      <div>
        <Navbar title="Form Submit" />

        <Form onSubmit={this.postFormsSubmission}>
          {this.state.fieldInput.map((field, i) => (
            <Form.Group>
              <Form.Label> {field.fieldLabel}</Form.Label>
              <Form.Control
                required
                type={field.inputType}
                placeholder={field.fieldLabel}
                value={this.state.arrayValues[i]}
                onChange={event =>
                  this.updateValueState(event, field.fieldLabel)
                }
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit" value="submit">
            submit
          </Button>
          <Button type="reset" value="Reset">
            Reset
          </Button>
        </Form>
        <Link to="/">back</Link>
      </div>
    );
  }
}
