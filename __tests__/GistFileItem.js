// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import GistFileItem from '../src/Components/GistFileItem';

const mockFile = {
      "filename": "Anagram.java",
      "type": "text/plain",
      "language": "Java",
      "raw_url": "https://gist.githubusercontent.com/jitun2004/015951870e6e47ecbd2372ce6afbc7b6/raw/6f7f94444471c2f50da79938efb830188e845f5e/Anagram.java",
      "size": 1095,
      "truncated": false,
      "content": ['package com.array;','','another line']
    };

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<GistFileItem key="aUniqueFileName.txt" file={mockFile} numLines="3"></GistFileItem>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
