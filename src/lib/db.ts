import Gun from 'gun/gun'
import { Octokit } from "octokit";

const gun = new Gun({
  peers: ['http://192.168.178.29:4200/gun']
})

export const db = gun.get('goodfirstweb3issue')

export const octokit = new Octokit();

export function updateRepo(ownerAndRepo: string) {
  const [owner, repo] = ownerAndRepo.split('/').map((str: string) => str.trim());

  Promise.all([
    octokit.request("GET /repos/{owner}/{repo}", { owner, repo }),
    octokit.request("GET /repos/{owner}/{repo}/issues", { owner, repo, labels: 'good first issue,web3' }),
  ]).then(([repo, issues]) => {
    if (issues.data.length > 0) {
      db.get('repos').get(ownerAndRepo).put({
        owner: repo.data.owner.login,
        name: repo.data.name,
        description: repo.data.description,
        stars: repo.data.stargazers_count,
        language: repo.data.language,
        lastActive: repo.data.pushed_at,
        lastMirrored: new Date().getTime(),
      }, () => {
        issues.data.forEach((issue: any) => {
          db.get('repos').get(ownerAndRepo).get('issues').get(issue.number).put({
            title: issue.title,
            number: issue.number,
            body: issue.body,
            createdAt: issue.created_at,
            assignee: issue.assignee?.login || '',
          })
        })
      })
    }
  })
}