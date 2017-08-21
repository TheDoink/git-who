// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import CommitList from '../src/Components/CommitList';

const mockUser = {
      "login": "hank",
      "id": 8534,
      "avatar_url": "https://avatars1.githubusercontent.com/u/8534?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/hank",
      "html_url": "https://github.com/hank",
      "followers_url": "https://api.github.com/users/hank/followers",
      "following_url": "https://api.github.com/users/hank/following{/other_user}",
      "gists_url": "https://api.github.com/users/hank/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/hank/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/hank/subscriptions",
      "organizations_url": "https://api.github.com/users/hank/orgs",
      "repos_url": "https://api.github.com/users/hank/repos",
      "events_url": "https://api.github.com/users/hank/events{/privacy}",
      "received_events_url": "https://api.github.com/users/hank/received_events",
      "type": "User",
      "site_admin": false
    };

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<CommitList repoName="git-who" gitUser={mockUser}></CommitList>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
