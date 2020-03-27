import React from 'react';
import './Results.scss';


type MyState = {

};

class Results extends React.Component<{}, MyState> {

  private urlParams = new URLSearchParams(window.location.search);
  private bundleName = this.urlParams.get('b');
  private bundleVersion = this.urlParams.get('v');

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    this.getBundleDetails();
  }

  private getBundleDetails(): void {
    fetch(`/api/getBundleDetails?bundleName=${this.bundleName}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      }, (error) => {
        console.error(error);
      });
  }

  public render(): JSX.Element {
    return (
      <p>hello</p>);
  }
}

export default Results;
