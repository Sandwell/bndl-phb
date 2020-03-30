import React from 'react';
import { shallow } from "enzyme";
import Request from './Request';

const component = shallow(<Request />);

test('Request loads correctly', () => {
  expect(component.find('.request')).toBeTruthy();
});

test('Logo loads correctly', () => {
  expect(component.find('.logo')).toBeTruthy();
});

test('Input loads correctly', () => {
  expect(component.find('input')).toBeTruthy();
});

test('Write in input', () => {
  component.setState({ search: 'react' });
  expect(component.find('input').props().value).toEqual('react');
});

test('Write in input should call handleChange method', () => {
  const spy = jest.spyOn(Request.prototype, "handleChange");
  const event = {
    target: {
      value: 'react'
    }
  };
  component.find('input').simulate('change', event);
  component.update();
  expect(spy).toHaveBeenCalled();
});
