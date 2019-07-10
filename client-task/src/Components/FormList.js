import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {  Link } from 'react-router-dom'
import './FormList.css';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default class FormList extends Component {
    constructor(props) {
        super(props);

        this.state = { 
          forms:[],
    }

}
async componentDidMount() {
  
    await this.allForms();
 
  
}
    allForms =  () => {
        
         fetch(`http://localhost:5000/forms`)
          .then(response => response.json())
          .then(forms => {
            this.setState({
                forms
            });
    
            console.log(this.state.forms)
          })
          .catch(error => console.error(error))
      }

 createData=(name, calories, fat, carbs, protein) =>{
    return { name, calories, fat, carbs, protein };
  }
 makeStyles=(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));
    
render(){
   // const classes = this.useStyles();
console.log()
    return (
        <div>

        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>formID</TableCell>
                <TableCell align="right">FormName</TableCell>
                <TableCell align="right">Submissions</TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.forms.map(form => (
                  
                <TableRow key={form.formID}>
                  <TableCell component="th" scope="row">
                    {form.formID}
                  </TableCell>
                  <TableCell align="right">{form.FormName}</TableCell>

                  <TableCell align="right">{form.Submissions}</TableCell>
                  <TableCell align="right">
                 <Link to={
                     {
                         pathname:'/Submit',
                         someState:{
                             formID:form.formID,
                         }
                     }
                 }>SUBMIT</Link>
                  

</TableCell>
<TableCell align="right">
                 <Link to={
                     {
                         pathname:'/Submission',
                         someState:{
                             formID:form.formID,
                         }
                     }
                 }>submissions</Link>
                  

</TableCell>
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
                  <Link to='/Builder'>add form</Link>
                  </div>

      );
}
 
}
