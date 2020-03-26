import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Request from './pages/request/Request';
import Results from './pages/results/Results';


type MyState = {
  bundleName: string;
  bundles: any[];
};

class App extends React.Component<{}, MyState> {

  public render(): JSX.Element {
    return (
      <main className="app">
        <Router>
          <Switch>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              <Request />
            </Route>
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
