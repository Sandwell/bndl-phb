import React from 'react';
import logo from './../../assets/images/logo.png';
import './Request.scss';
import { Link } from 'react-router-dom';


/**
 * Interfaces
 */
interface MyProps { }

interface MyState {
  search: string;
  bundles: any[];
};

export default class Request extends React.Component<MyProps, MyState> {

  private timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 200);

  constructor(props: MyProps) {
    super(props);
    this.state = {
      search: '',
      bundles: []
    }
  }

  /**
   * Trigger debounce time when component is updated and when uer has typed something
   */
  public componentDidUpdate(prevProps: {}, prevState: MyState): void {
    if (prevState.search !== this.state.search && this.state.search.length) {
      this.handleDebounce();
    }
  }

  /**
   * Set the correct value to the State
   */
  private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ search: event.target.value });
  }

  /**
   * Debounce handler in order to not spam the Back-End for each time the user types
   */
  private handleDebounce(): void {
    // Clears running timer and starts a new one each time the user types
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getBundleList();
    }, 500);
  }

  /**
   * Call Back-End in order to populate the auto-complete
   */
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

  /**
   * Classic render method
   */
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
            <ul className="auto-complete">
              {this.state.bundles.map((bundle, i) =>
                <li className="bundle" key={i}>
                  <Link to={`/results?b=${bundle.name}&v=${bundle.version}`}>
                    <div className="name">{bundle.name}</div>
                    <div className="desc">{bundle.description}</div>
                    <div className="version">@{bundle.version}</div>
                  </Link>
                </li>
              )}
            </ul>
            : null}
        </form>
      </main>);
  }
}
