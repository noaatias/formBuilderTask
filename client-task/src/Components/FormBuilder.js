import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormBuilder.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Navbar from './Navbar.js';

export default class FormBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      fieldLabel: '',
      name: '',
      type: '',
      fieldInput: [],
      field: [],
      formName: 'Form Name',
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let newField = (
      <Form.Group>
        {this.state.fieldLabel}:{' '}
        <Form.Control type={this.state.type} placeholder={this.state.name} />
      </Form.Group>
    );
    this.setState({
      show: true,
      fieldInput: [...this.state.fieldInput, newField],
      field: [
        ...this.state.field,
        {
          formName: this.state.formName,
          fieldInput: this.state.fieldLabel,
          type: this.state.type,
          name: this.state.name,
        },
      ],
    });
  };
  createForm = async e => {
    e.preventDefault();
    this.setState({
      show: false,
      fieldLabel: '',
      name: '',
      type: '',
      fieldInput: [],
      field: [],

      formName: '',
    });
    const response = await fetch(`http://localhost:5000/forms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.field),
    });
    console.log(this.state.field);

    if (response.status === 200) {
      console.log('added');
    } else {
      console.error('not added!');
    }
  };

  updatefieldLabelState(event) {
    this.setState({ fieldLabel: event.target.value });
  }

  updateNameState(event) {
    this.setState({ name: event.target.value });
  }

  updateTypeState(event) {
    this.setState({ type: event.target.value });
  }
  updateformNameState(event) {
    this.setState({ formName: event.target.value });
  }
  render() {
    return (
      <>
        <Navbar title="Create New Form!" />
        <Form className="create" onSubmit={this.handleFormSubmit}>
          {!this.state.show && (
            <Form.Group controlId="formName">
              <Form.Label> form name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=" formName"
                value={this.state.formName}
                onChange={event => this.updateformNameState(event)}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formLabel">
            <Form.Label> field label</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=" field label"
              value={this.state.fieldLabel}
              onChange={event => this.updatefieldLabelState(event)}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>input name</Form.Label>
            <Form.Control
              required
              placeholder="text"
              value={this.state.name}
              onChange={event => this.updateNameState(event)}
            />
          </Form.Group>
          <Form.Group controlId="formSelect">
            <Form.Label>type</Form.Label>
            <Form.Control
              required
              as="select"
              value={this.state.type}
              onChange={event => this.updateTypeState(event)}
            >
              <option>checkbox</option>
              <option>color</option>
              <option>date</option>
              <option>email</option>
              <option>file</option>
              <option>number</option>
              <option>password</option>
              <option>reset</option>
              <option>search</option>
              <option>text</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" value="submit">
            addField
          </Button>
        </Form>
        <Card>
          <Form className="viewer" onSubmit={this.createForm}>
            <p className="formName">{this.state.formName} </p>

            {this.state.fieldInput.map(field1 => field1)}
            <Button className="submit" value="submit" type="submit">
              Create form
            </Button>
          </Form>
        </Card>

        <Link to="/">Back</Link>
      </>
    );
  }
}
