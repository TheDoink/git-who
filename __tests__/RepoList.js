// var NameLink = require('../src/Components/NameLink');
import React from 'react';
import renderer from 'react-test-renderer';
import RepoList from '../src/Components/RepoList';

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

  // Testing visible gists & repos
  let testMe = renderer.create(<RepoList gitUser={mockUser} repoOrGist="repo" shouldHide="false"></RepoList>).toJSON();
  expect(testMe).toMatchSnapshot();

  testMe = renderer.create(<RepoList gitUser={mockUser} repoOrGist="gist" shouldHide="false"></RepoList>).toJSON();
  expect(testMe).toMatchSnapshot();

  // Testing hidden gists & repos
  testMe = renderer.create(<RepoList gitUser={mockUser} repoOrGist="repo" shouldHide="true"></RepoList>).toJSON();
  expect(testMe).toMatchSnapshot();

  testMe = renderer.create(<RepoList gitUser={mockUser} repoOrGist="gist" shouldHide="true"></RepoList>).toJSON();
  expect(testMe).toMatchSnapshot();
});
