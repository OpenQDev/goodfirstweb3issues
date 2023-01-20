import Gun from 'gun/gun'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import Dexie, { Table } from 'dexie';
import { Octokit } from 'octokit';
import reposWhitelist from './reposWhitelist.json';

const gun = new Gun({
  peers: [
    'http://192.168.178.29:4200/gun',
    'https://phorum-relay.mktcode.uber.space/gun'
  ],
  localStorage: false,
})

const octokit = new Octokit();

export interface Issue {
  id: string;
  number: number;
  title: string;
  url: string;
  assignee: string;
  comments: number;
}

export interface Repo {
  id: string;
  owner: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  lastSynced: number;
  issuesCount: number;
  issuesJson: string;
}

class Database extends Dexie {
  repos!: Table<Repo>;

  constructor() {
    super('database');
    this.version(2).stores({
      repos: 'id,owner,name,issuesCount',
    });
  }
}

export const db = new Database();

export async function syncRepoWithGithub(ownerAndRepo: string) {
  const [owner, name] = ownerAndRepo.split('/').map((str: string) => str.trim());

  const githubRepo = await octokit.request("GET /repos/{owner}/{repo}", { owner, repo: name })
  const githubIssues = await octokit.request("GET /repos/{owner}/{repo}/issues", { owner, repo: name, labels: 'good first issue' })

  const repo = {
    id: githubRepo.data.node_id,
    owner,
    name,
    description: githubRepo.data.description || '',
    url: githubRepo.data.html_url,
    language: githubRepo.data.language || '',
    stars: githubRepo.data.stargazers_count,
    lastSynced: new Date().getTime(),
    issuesCount: githubIssues.data.length,
    issuesJson: JSON.stringify(githubIssues.data.map((issue) => ({
      id: issue.node_id,
      number: issue.number,
      title: issue.title,
      url: issue.html_url,
      assignee: issue.assignee?.login || '',
      comments: issue.comments,
    }))),
  }

  gun.get(ownerAndRepo).put(repo)
}

reposWhitelist.forEach((ownerAndRepo) => {
  gun.get(ownerAndRepo).on((repo: Repo) => {
    if (!repo.id) return; // seems to be necessary in brave browser
    db.repos.put({
      id: repo.id,
      owner: repo.owner,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      language: repo.language,
      stars: repo.stars,
      lastSynced: repo.lastSynced,
      issuesCount: repo.issuesCount,
      issuesJson: repo.issuesJson,
    });
  })
})

const randomWhitelistedRepo = reposWhitelist[Math.floor(Math.random() * reposWhitelist.length)];
syncRepoWithGithub(randomWhitelistedRepo);