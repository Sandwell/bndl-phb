import React from 'react';
import logo from './../../assets/images/logo.png';
import './Request.scss';


type MyState = {
  search: string;
  bundles: any[];
};

class Request extends React.Component<{}, MyState> {

  private timer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      bundles: []
    }
  }

  public componentDidUpdate(prevProps: {}, prevState: MyState): void {
    if (prevState.search !== this.state.search && this.state.search.length) {
      this.handleDebounce();
    }
  }

  public getBundleVersions(bundleName: string): void {
    fetch(`/api/getBundleVersions?bundleName=${bundleName}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          bundles: result
        })
      }, (error) => {
        console.error(error);
      });
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ search: event.target.value });
  }

  private handleDebounce(): void {
    // Clears running timer and starts a new one each time the user types
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getBundleList();
    }, 200);
  }

  private getBundleList(): void {
    fetch(`/api/getBundleList?search=${encodeURIComponent(this.state.search)}`)
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
      <main className="request">
        <img src={logo} className="logo-graphic" alt="logo" />
        <div className="logo-name">
          <span>BUNDLE</span>
          <span>CRINGE</span>
        </div>
        <p className="subtitle">Do not take the risk to add an heavy package to use 10% of it.</p>
        <form>
          <input autoComplete="off" name="library" type="text" value={this.state.search} onChange={(event) => this.handleChange(event)} placeholder="find package" />
          {this.state.bundles.length ?
            <div className="auto-suggest">
              {this.state.bundles.map((bundle, i) =>
                <div className="bundle" key={i} onClick={(event) => this.getBundleVersions(bundle.name)}>
                  <div className="name">{bundle.name}</div>
                  <div className="desc">{bundle.description}</div>
                </div>
              )}
            </div>
            : null}
        </form>
      </main>);
  }
}

export default Request;
