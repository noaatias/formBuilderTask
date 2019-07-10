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
            submissionForms:[],
            formID:32,
            submissionFormId:[],

       
    }


    }
    async componentDidMount() {
       await this.formsSubmission();
  //console.log(this.state.formID)
     
      
    }
    formsSubmission= array=>{
        let obj={};
        array.forEach(shura => {
let arr=obj[shura.formSubmissionID]
if(!arr){
   arr=[shura] 
   obj[shura.formSubmissionID]=arr;
}   
else{
    obj[shura.formSubmissionID].push(shura)
}      
        });
        return obj;
    }
    formsSubmission=async e=>{
       
        
       await fetch(`http://localhost:5000/submission/`)
         .then(response => response.json())
         .then(submissionForms => {
             console.log(submissionForms)
            // submissionForms.filter(form=>{
            //     form.formID==this.state.formID
            // })
           this.setState({
            submissionForms
           });
   
           console.log(this.state.submissionForms)
         })
         .catch(error => console.error(error))
         fetch(`http://localhost:5000/submission/${this.state.formID}`)
         .then(response => response.json())
         .then(submissionFormId => {
             console.log(submissionFormId)
            // submissionForms.filter(form=>{
            //     form.formID==this.state.formID
            // })
           this.setState({
            submissionFormId
           });
   
           console.log(this.state.submissionFormId)
         })
         .catch(error => console.error(error))

}
 
      
    render() {
        const{submissionFormId ,submissionForms}=this.state
        const objFormSub=formsSubmission(submissionForms);
        const key=Object.keys(objFormSub);
        console.log(this.props.location.someState.formID)
        return(
            <div>
            {
            
            }
            </div>
        )
    }
}
