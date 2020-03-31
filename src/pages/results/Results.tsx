import React from 'react';
import './Results.scss';
import loader from './../../assets/images/loader.svg';
import logo from './../../assets/images/logo.png';

/**
 * Interfaces
 */
interface MyProps { }
interface Bundle { bundleName: string, bundleVersion: string, min: number, gzip: number }

interface MyState {
  isLoading: boolean;
  refSizeBar: number,
  requestedBundle: Bundle | null,
  bundlesInfos: Bundle[] | null,
  error: { status: number, details: string }
};

export default class Results extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);
    this.state = {
      isLoading: true,
      refSizeBar: 0,
      requestedBundle: null,
      bundlesInfos: null,
      error: { status: 0, details: '' }
    }
  }

  private urlParams = new URLSearchParams(window.location.search);
  private bundleName = this.urlParams.get('b');
  private bundleVersion = this.urlParams.get('v');
  private maxSize = 0;
  private biggestBundle = 0;

  public componentDidMount(): void {
    this.getBundleDetails();
  }

  /**
   * Call Back-End at page load so the user can refresh it
   * or change param a get results without going on request page
   */
  private getBundleDetails(): void {
    fetch(`/api/getBundleDetails?bundleName=${this.bundleName}`)
      .then(res => res.json())
      .then((result) => {
        // I know it's a bad error handling but I did not manage to send a proper error from Back-End
        if (!result.error) {
          this.setState({
            isLoading: false,
            bundlesInfos: result,
            requestedBundle: result.find((bundle: Bundle) => bundle.bundleVersion === this.bundleVersion)
          });
          this.getRefSizeBar();
        } else {
          this.setState({
            isLoading: false,
            error: result.error
          });
        }
      });
  }

  /**
   * Get the heaviest file size as reference to create the chart.
   * Basically we get the heaviest bundle and then get his minified size.
   */
  private getRefSizeBar(): void {
    if (this.state.bundlesInfos) {
      this.state.bundlesInfos.forEach((bundleInfo, i) => {
        if (this.maxSize < bundleInfo.gzip + bundleInfo.min) {
          this.maxSize = bundleInfo.gzip + bundleInfo.min;
          this.biggestBundle = i;
        }
      });
      this.setState({ refSizeBar: this.state.bundlesInfos[this.biggestBundle].min });
    }
  }

  /**
   * Classic render method
   */
  public render(): JSX.Element {
    return (
      <div className="results">
        {/* Is data loading */}
        {this.state.isLoading ?
          <div className="d-flex flex-column align-center loader">
            <img src={loader} alt="logo" />
            <p className="roboto-bold text-center">Loading</p>
          </div>
          :
          <div>
            {/* Check if we got infos we need before displaying */}
            {this.state.requestedBundle && this.state.bundlesInfos && this.state.bundlesInfos.length > 0 ?
              <div>
                <h1 className="roboto-bold text-center fs-12">{this.state.requestedBundle.bundleName}@{this.state.requestedBundle.bundleVersion}</h1>
                <div className="d-flex flex-column">
                  <div className="wrapper width-100">
                    <h3 className="roboto text-center roboto fs-8 text-grey-light">BUNDLE SIZE</h3>
                    <div className="d-flex">
                      <div className="width-50 text-center">
                        <p className="roboto-bold">
                          <span className="fs-12">{this.state.requestedBundle.min}</span>
                          <span className="fs-8 text-red"> kB</span>
                        </p>
                        <p>MINIFIED</p>
                      </div>
                      <div className="width-50 text-center">
                        <p className="roboto-bold">
                          <span className="fs-12">{this.state.requestedBundle.gzip}</span>
                          <span className="fs-8 text-red"> kB</span>
                        </p>
                        <p>GZIPED</p>
                      </div>
                    </div>
                  </div>
                  <div className="wrapper width-100">
                    <h3 className="roboto text-center roboto fs-8 text-grey-light">COMPARISON WITH PREVIOUS VERSIONS</h3>
                    {/* Loop on bundles infos */}
                    {this.state.bundlesInfos.map((bundleInfo, i) =>
                      <div className="chart d-flex flex-column" key={i}>
                        <span className="fs-4">{bundleInfo.bundleVersion}</span>
                        <div className="bar-wrapper d-flex">
                          <span className="bar gzip-bar bg-blue-dark" style={{ width: (bundleInfo.gzip * 100) / this.state.refSizeBar + '%' }}>
                            <span className="format fs-4">gzip : {bundleInfo.gzip}kB</span>
                          </span>
                          <span className="bar min-bar bg-blue" style={{ width: ((bundleInfo.min * 100) / this.state.refSizeBar) - ((bundleInfo.gzip * 100) / this.state.refSizeBar) + '%' }}>
                            <span className="format fs-4">min : {bundleInfo.min}kB</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div> :
              <div className="d-flex flex-column align-center">
                {/* Error handler */}
                <img src={logo} className="logo-graphic" alt="logo" />
                <div className="logo-name">
                  <span className="roboto-bold fs-12">OUPS ! SOMETHING WENT </span>
                  <span className="roboto-bold fs-12 text-red">WRONG</span>
                  <p className="roboto-bold fs-6 text-center">Error: {this.state.error.details}</p>
                </div>
              </div>}
          </div>
        }
      </div>
    );
  }
}
