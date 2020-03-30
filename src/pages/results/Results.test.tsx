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
