// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import NameLink from '../src/Components/NameLink';

it('lines up with the snapshot', () => {
  let myLink = renderer.create(<NameLink userName="steve"></NameLink>).toJSON();
  expect(myLink).toMatchSnapshot();
});
