import React from 'react';
import renderer from 'react-test-renderer';
import NameInput from '../src/Components/NameInput';

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<NameInput setUser={function(){}}></NameInput>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
