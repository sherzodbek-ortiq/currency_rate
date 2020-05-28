import React from "react"
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Rates from './guest/Rates';
import AdminPanel from './admin/AdminPanel';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/admin" exact component={AdminPanel} />
          <Route path="/" component={Rates} />
        </Switch>
      </Router>
    );
  }
}

export default App