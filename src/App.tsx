import React from 'react';
import logo from './assets/logo.png';
import './App.scss';


type MyState = {
  bundleName: string;
  bundles: any[];
};

class App extends React.Component<{}, MyState> {

  private timer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      bundleName: '',
      bundles: []
    }
  }

  public componentDidUpdate(prevProps: {}, prevState: MyState): void {
    if (prevState.bundleName !== this.state.bundleName && this.state.bundleName.length) {
      this.handleDebounce();
    }
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ bundleName: event.target.value });
  }

  private handleDebounce(): void {
    // Clears running timer and starts a new one each time the user types
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fetchLibraries();
    }, 200);
  }

  private fetchLibraries(): void {
    fetch(`/api/getBundleList?bundleName=${encodeURIComponent(this.state.bundleName)}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          bundles: result
        })
      }, (error) => {
        console.error(error);
      });
  }

  public render(): JSX.Element {
    return (
      <main className="app">
        <img src={logo} className="logo-graphic" alt="logo" />
        <div className="logo-name">
          <span>BUNDLE</span>
          <span>CRINGE</span>
        </div>
        <p className="subtitle">Do not take the risk to add an heavy package to use 10% of it.</p>
        <form>
          <input autoComplete="off" name="library" type="text" value={this.state.bundleName} onChange={(event) => this.handleChange(event)} placeholder="find package" />
          {this.state.bundles.length ?
            <div className="auto-suggest">
              {this.state.bundles.map((module, i) =>
                <div className="module" key={i}>
                  <div className="module-name">{module.name}</div>
                  <div className="module-desc">{module.description}</div>
                </div>
              )}
            </div>
            : null}
        </form>
      </main>);
  }
}

export default App;
