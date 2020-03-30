import React from 'react';
import { shallow } from "enzyme";
import App from './App';

test('App loads correctly', () => {
  const component = shallow(<App />);
  expect(component.find('main').hasClass('app')).toBeTruthy();
});
