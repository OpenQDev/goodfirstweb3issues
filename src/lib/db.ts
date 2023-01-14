import Gun from 'gun/gun'

const gun = new Gun({
  peers: ['http://192.168.178.29:4200/gun']
})

export const db = gun.get('asdsad').get('goodfirstweb3issue')