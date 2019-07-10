import React, { Component } from "react";
// import Card from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormBuilder.css';
import {  Link } from 'react-router-dom'


export default class FormBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            show: false,
            fieldLabel:'',
            name:'',
            type:'',
            fieldInput:[],
            field:[],

            formName:'nana'

           
    }

    }
    
    handleFormSubmit = event => {
        console.log('Submited form', this.state);
        event.preventDefault();
        let newField=<div>
           {this.state.fieldLabel}: <input type={this.state.type} name={this.state.name}></input>
        </div>
        this.setState({
          show: true,
          fieldInput:[...this.state.fieldInput,newField],
          field:[...this.state.field,{formName:this.state.formName,fieldInput:this.state.fieldLabel,type:this.state.type,name:this.state.name}]
        });
    
        
        
      };
      createForm= async e=>{

        e.preventDefault();
this.setState ({ 
            show: false,
            fieldLabel:'',
            name:'',
            type:'',
            fieldInput:[],
            field:[],

            formName:''

           
    })
        const response = await fetch(`http://localhost:5000/forms/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.field)
          });
          console.log(this.state.field)
      
          if (response.status === 200) {
          
            console.log('added');
          } else {
            console.error('not added!');
          }
         
   
    console.log(this.state.field)
      }
    
      
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
       
  <h1>New Form</h1>
          
            <Form onSubmit={this.handleFormSubmit}>
          {console.log(this.state.field)}{
              !this.state.show&&
              <Form.Group controlId='formName'>
              <Form.Label> form name</Form.Label>
              <Form.Control
                type='text'
                placeholder=' formName'
                value={this.state.formName}
                onChange={event => this.updateformNameState(event)}
              />
            </Form.Group>
          }
                <Form.Group controlId='formLabel'>
                  <Form.Label> field label</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=' field label'
                    value={this.state.fieldLabel}
                    onChange={event => this.updatefieldLabelState(event)}
                  />
                </Form.Group>
  
                <Form.Group controlId='formName'>
                  <Form.Label>input name</Form.Label>
                  <Form.Control
                    placeholder='text'
                    value={this.state.name}
                    onChange={event => this.updateNameState(event)}
                  />
                </Form.Group>
                <Form.Group controlId='formSelect'>
                  <Form.Label>type</Form.Label>
                  <Form.Control
                    as='select'
                    value={this.state.type}
                    onChange={event => this.updateTypeState(event)}
                >
                <option>button</option>
                <option>checkbox</option>
                <option>color</option>
                <option>date</option>
                <option>email</option>
                <option>file</option>
                <option>image</option>
                <option>number</option>
                <option>password</option>
                <option>reset</option>
                <option>search</option>
                <option>text</option>

                </Form.Control>
                </Form.Group>
                
                <Button variant='primary' type='submit' value='submit'>
                  addField
                </Button>
            </Form>
            <h2 class="viewer">form view <br></br>
            {
              this.state.fieldInput.map(field1=>field1
              )
            }
                             <button className='submit' onClick={e=>this.createForm(e)}> <Link to='/'>create form</Link></button>
            </h2>
            
        </>
        
          )
    }

  }
