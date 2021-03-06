import React from 'react';
import renderer from 'react-test-renderer';
import RepoItem from '../src/Components/RepoItem';

const mockRepo =   {
    "id": 47034580,
    "name": "ddclient",
    "full_name": "hank/ddclient",
    "owner": {
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
    },
    "private": false,
    "html_url": "https://github.com/hank/ddclient",
    "description": "Fork of the original ddclient code",
    "fork": true,
    "url": "https://api.github.com/repos/hank/ddclient",
    "forks_url": "https://api.github.com/repos/hank/ddclient/forks",
    "keys_url": "https://api.github.com/repos/hank/ddclient/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/hank/ddclient/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/hank/ddclient/teams",
    "hooks_url": "https://api.github.com/repos/hank/ddclient/hooks",
    "issue_events_url": "https://api.github.com/repos/hank/ddclient/issues/events{/number}",
    "events_url": "https://api.github.com/repos/hank/ddclient/events",
    "assignees_url": "https://api.github.com/repos/hank/ddclient/assignees{/user}",
    "branches_url": "https://api.github.com/repos/hank/ddclient/branches{/branch}",
    "tags_url": "https://api.github.com/repos/hank/ddclient/tags",
    "blobs_url": "https://api.github.com/repos/hank/ddclient/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/hank/ddclient/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/hank/ddclient/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/hank/ddclient/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/hank/ddclient/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/hank/ddclient/languages",
    "stargazers_url": "https://api.github.com/repos/hank/ddclient/stargazers",
    "contributors_url": "https://api.github.com/repos/hank/ddclient/contributors",
    "subscribers_url": "https://api.github.com/repos/hank/ddclient/subscribers",
    "subscription_url": "https://api.github.com/repos/hank/ddclient/subscription",
    "commits_url": "https://api.github.com/repos/hank/ddclient/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/hank/ddclient/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/hank/ddclient/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/hank/ddclient/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/hank/ddclient/contents/{+path}",
    "compare_url": "https://api.github.com/repos/hank/ddclient/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/hank/ddclient/merges",
    "archive_url": "https://api.github.com/repos/hank/ddclient/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/hank/ddclient/downloads",
    "issues_url": "https://api.github.com/repos/hank/ddclient/issues{/number}",
    "pulls_url": "https://api.github.com/repos/hank/ddclient/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/hank/ddclient/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/hank/ddclient/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/hank/ddclient/labels{/name}",
    "releases_url": "https://api.github.com/repos/hank/ddclient/releases{/id}",
    "deployments_url": "https://api.github.com/repos/hank/ddclient/deployments",
    "created_at": "2015-11-28T18:18:06Z",
    "updated_at": "2017-08-11T12:14:27Z",
    "pushed_at": "2015-11-29T19:25:15Z",
    "git_url": "git://github.com/hank/ddclient.git",
    "ssh_url": "git@github.com:hank/ddclient.git",
    "clone_url": "https://github.com/hank/ddclient.git",
    "svn_url": "https://github.com/hank/ddclient",
    "homepage": "http://ddclient.sf.net",
    "size": 161,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "Perl",
    "has_issues": false,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 3,
    "open_issues": 0,
    "watchers": 7,
    "default_branch": "master"
  };

it('lines up with the snapshot', () => {
  let testMe = renderer.create(<RepoItem key="aKey" repo={mockRepo} repoOrGist="repo"></RepoItem>).toJSON();

  expect(testMe).toMatchSnapshot();
  // testMe.getGist('d2eace7977e2aeaf942de0f8b3e7275c');

  
});
