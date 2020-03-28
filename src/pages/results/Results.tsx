import React from 'react';
import './Results.scss';

/**
 * Interfaces
 */
interface MyProps { }

interface MyState {
  bundleName: string;
  bundleVersion: string;
};

export default class Results extends React.Component<MyProps, MyState> {

  private urlParams = new URLSearchParams(window.location.search);
  private bundleName = this.urlParams.get('b');
  private bundleVersion = this.urlParams.get('v');

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
