import React from 'react';
import './Results.scss';


type MyState = {
  bundleName: string;
  bundles: any[];
};

class Results extends React.Component<{}, MyState> {


  public render(): JSX.Element {
    return (
      <p>hello</p>);
  }
}

export default Results;
