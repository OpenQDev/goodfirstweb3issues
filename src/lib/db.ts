import Gun from 'gun/gun'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import { Octokit } from "octokit";

const gun = new Gun({
  peers: ['http://192.168.178.29:4200/gun'],
  localStorage: false,
})

const octokit = new Octokit();

export const db = gun.get('goodfirstweb3issue')

export function syncRepoWithGithub(ownerAndRepo: string) {
  const [owner, name] = ownerAndRepo.split('/').map((str: string) => str.trim());

  Promise.all([
    octokit.request("GET /repos/{owner}/{repo}", { owner, repo: name }),
    octokit.request("GET /repos/{owner}/{repo}/issues", { owner, repo: name, labels: 'good first issue,web3' }),
  ]).then(([repo, issues]) => {
    db.get('repos').get(repo.data.node_id).put({
      id: repo.data.node_id,
      owner,
      name,
      description: repo.data.description || '',
      stars: repo.data.stargazers_count,
      language: repo.data.language || '',
      lastActive: repo.data.pushed_at,
      lastMirrored: new Date().getTime(),
      issueIds: issues.data.map((issue) => issue.node_id).join(','),
    })

    issues.data.forEach((issue) => {
      db.get('issues').get(issue.node_id).put({
        id: issue.node_id,
        title: issue.title,
        number: issue.number,
        url: issue.html_url,
        assignee: issue.assignee?.login || '',
      })
    })
  })
}