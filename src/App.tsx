import React from 'react';
import logo from './assets/logo.png';
import './App.scss';


type MyState = { value: string };

class App extends React.Component<{}, MyState> {

  private timer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    }
  }

  public componentDidUpdate(prevProps: {}, prevState: MyState) {
    if (prevState.value !== this.state.value) {
      this.handleCheck();
    }
  }

  private setValue(value: string): void {
    this.setState({ value: value });
  }

  private handleCheck(): void {
    // Clears running timer and starts a new one each time the user types
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fetchLibraries();
    }, 2000);
  }

  private fetchLibraries(): void {
    console.log('Call');
  }

  render() {
    return (
      <main className="app">
        <img src={logo} className="logo-graphic" alt="logo" />
        <div className="logo-name">
          <span>BUNDLE</span>
          <span>CRINGE</span>
        </div>
        <p>Do not take the risk to add an heavy package to use 10% of it.</p>
        <input name="library" type="text" value={this.state.value} onChange={e => this.setValue(e.target.value)} placeholder="find package" />
      </main>);
  }
}

export default App;
