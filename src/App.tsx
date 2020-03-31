import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Request from './pages/request/Request';
import Results from './pages/results/Results';

class App extends React.Component<{}, {}> {

  public render(): JSX.Element {
    return (
      <main className="app">
        <div className="app-wrapper">
          <Router>
            <Switch>
              <Route exact path="/" component={Request} />
              <Route exact path="/results" component={Results} />
            </Switch>
          </Router>
        </div>
      </main>
    );
  }
}

export default App;
