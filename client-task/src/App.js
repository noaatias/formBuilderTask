import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormBuilder from './Components/FormBuilder';
import FormList from './Components/FormList';
import FormSubmit from './Components/FormSubmit';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import FormSubmission from './Components/FormSubmission';

function App() {
  return (
    <Router>
      <Route exact path='/' component={FormList} />
      <div >
        <Switch>
          <Route exact path='/Builder' component={FormBuilder} />
          <Route exact path='/Submit' component={FormSubmit} />
          <Route exact path='/Submission' component={FormSubmission} />

        </Switch>
      </div>
  </Router> 
   );
}

export default App;
