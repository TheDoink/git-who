// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import GistItem from '../src/Components/GistItem';

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<GistItem gistId="d2eace7877e2aeaf942de0f8b3e7275c"></GistItem>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
