import React from 'react';
import { shallow } from "enzyme";
import Results from './Results';

const component = shallow(<Results />);

test('Results loads correctly', () => {
  expect(component.find('.results').exists()).toBeTruthy();
});

test('Loader is there if isLoading === true', () => {
  component.setState({
    isLoading: true
  });
  component.update();
  expect(component.find('.loader').exists()).toBeTruthy();
});

test('Loader is there if isLoading === false', () => {
  component.setState({
    isLoading: false
  });
  component.update();
  expect(component.find('.loader').exists()).toBeFalsy();
});

test('Chart is there if there is data', () => {
  const requestedBundleMock = { bundleName: "small-validate", bundleVersion: "1.0.3", min: 2.503, gzip: 0.973 };
  const bundlesInfosMock = [{ bundleName: "small-validate", bundleVersion: "1.0.3", min: 2.503, gzip: 0.973 }, { bundleName: "small-validate", bundleVersion: "1.0.2", min: 2.404, gzip: 0.914 }, { bundleName: "small-validate", bundleVersion: "1.0.1", min: 1.95, gzip: 0.793 }]
  component.setState({
    isLoading: false,
    requestedBundle: requestedBundleMock,
    bundlesInfos: bundlesInfosMock
  });
  component.update();
  expect(component.find('.chart').exists()).toBeTruthy();
});
