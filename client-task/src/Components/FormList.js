import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import './FormList.css';
import Navbar from './Navbar.js';

export default class FormList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forms: [],
    };
  }
  styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    tablecell: {
      fontSize: '100pt',
    },
  });
  componentDidMount() {
    this.allForms();
  }
  //get all the forms
  allForms = async () => {
    await fetch(`http://localhost:5000/forms`)
      .then(response => response.json())
      .then(forms => {
        this.setState({
          forms,
        });
      })
      .catch(error => console.error(error));
  };

  render() {
    const classes = this.styles;
    // const classes = this.useStyles();
    console.log();
    return (
      <div>
        <Navbar title="Form List" />

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '30px' }}>formID</TableCell>
                <TableCell style={{ fontSize: '30px' }} align="right">
                  FormName
                </TableCell>
                <TableCell style={{ fontSize: '30px' }} align="right">
                  Submissions
                </TableCell>
                <TableCell style={{ fontSize: '30px' }} align="right">
                  submit
                </TableCell>
                <TableCell style={{ fontSize: '30px' }} align="right">
                  submissions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.forms.map(form => (
                <TableRow key={form.formID}>
                  <TableCell
                    style={{ fontSize: '15px' }}
                    component="th"
                    scope="row"
                  >
                    {form.formID}
                  </TableCell>
                  <TableCell style={{ fontSize: '15px' }} align="right">
                    {form.FormName}
                  </TableCell>

                  <TableCell style={{ fontSize: '15px' }} align="right">
                    {form.Submissions}
                  </TableCell>
                  <TableCell style={{ fontSize: '15px' }} align="right">
                    <Link
                      to={{
                        pathname: '/Submit',
                        someState: {
                          formID: form.formID,
                        },
                      }}
                    >
                      SUBMIT
                    </Link>
                  </TableCell>
                  <TableCell style={{ fontSize: '15px' }} align="right">
                    <Link
                      to={{
                        pathname: '/Submission',
                        someState: {
                          formID: form.formID,
                        },
                      }}
                    >
                      submissions
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Link to="/Builder">Add form</Link>
      </div>
    );
  }
}
