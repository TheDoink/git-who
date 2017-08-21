// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import CommitItem from '../src/Components/CommitItem';

const exampleCommit = {
    "sha": "a5eca57f4a29e99d17e296ee6afe5ff4c64ff931",
    "commit": {
      "author": {
        "name": "Andrey Lushnikov"
      },

      "message": "Add proxy server example (#427)"
    },
    "author": {
      "login": "aslushnikov",
      "id": 746130
    },
    "committer": {
      "login": "ebidel",
      "id": 238208,
    },
    "parents": [
      {
        "sha": "281db8feccfda0f887fafd31fc4f9dcff414d531",
        "url": "https://api.github.com/repos/GoogleChrome/puppeteer/commits/281db8feccfda0f887fafd31fc4f9dcff414d531",
        "html_url": "https://github.com/GoogleChrome/puppeteer/commit/281db8feccfda0f887fafd31fc4f9dcff414d531"
      }
    ]
  };

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<CommitItem key="35387538" commit={exampleCommit}></CommitItem>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
