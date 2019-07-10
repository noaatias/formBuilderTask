import React, { Component } from "react";
// import Card from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormBuilder.css';
import {  Link } from 'react-router-dom'


export default class FormSubmit extends Component {

    constructor(props) {
        super(props);

        this.state = { 
        //   formID:32,
            fieldInput:[],
            formID:this.props.location.someState.formID
            



    }


    }
    async componentDidMount() {
  //console.log(this.state.formID)
        await this.getFormField();
     
      
    }
    handleFormSubmit = event => {
        // console.log('Submited form', this.state);
        // event.preventDefault();
        // let newField=<div>
        //    {this.state.fieldLabel}: <input type={this.state.type} name={this.state.name}></input>
        // </div>
        // this.setState({
        //   show: true,
        //   fieldInput:[...this.state.fieldInput,newField],
        //   field:[...this.state.field,{formName:this.state.formName,fieldInput:this.state.fieldLabel,type:this.state.type,name:this.state.name}]
        // });
    console.log('submit')
        
        
      };
      createForm= async e=>{

//         e.preventDefault();
// this.setState ({ 
//             show: false,
//             fieldLabel:'',
//             name:'',
//             type:'',
//             fieldInput:[],
//             field:[],

//             formName:''

           
//     })
//         const response = await fetch(`http://localhost:5000/forms/`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(this.state.field)
//           });
//           console.log(this.state.field)
      
//           if (response.status === 200) {
          
//             console.log('added');
//           } else {
//             console.error('not added!');
//           }
         
   
//     console.log(this.state.field)
      }
    
      
    //   updatefieldLabelState(event) {
    //     this.setState({ fieldLabel: event.target.value });
    //   }
    
    //   updateNameState(event) {
    //     this.setState({ name: event.target.value });
    //   }
    
    //   updateTypeState(event) {
    //     this.setState({ type: event.target.value });
    //   }
    //   updateformNameState(event) {
    //     this.setState({ formName: event.target.value });
    //   }
    getFormField=async e=>{
       
        
            fetch(`http://localhost:5000/forms/${this.state.formID}`)
             .then(response => response.json())
             .then(fieldInput => {
               this.setState({
                fieldInput
               });
       
               console.log(this.state.fieldInput)
             })
             .catch(error => console.error(error))
         
   
    }
    render() {
        console.log(this.props.location)
          return (
              <div>
     <Form onSubmit={this.handleFormSubmit}>
       
{       this.state.fieldInput.map(field=>(
    <Form.Group >
    <Form.Label> {field.fieldLabel}</Form.Label>
    <Form.Control
      type={field.inputType}
      placeholder={field.fieldLabel}
      // value={this.state.fieldLabel}
      // onChange={event => this.updatefieldLabelState(event)}
    />
  </Form.Group>

))
}
<Button variant='primary' type='submit' value='submit'>
                  <Link to="/">Submit</Link>
                </Button>
</Form>
         
         </div>        
  )}}
