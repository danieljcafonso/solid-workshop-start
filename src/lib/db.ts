import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'
import crypto from 'crypto'

export type Pokemon = {
  id: number
  title: string
  image: number
}

type Password = {
  hash: string
  salt: string
}

export type User = {
  email: string
  password: Password
}

export const storage = createStorage({
  driver: fsLiteDriver({
    base: './data',
  }),
})

//init
storage.setItem('pkm:data', [
  {
    title: 'pikachu',
    image: 25,
    id: 0,
  },
  {
    title: 'bulbasaur',
    image: 1,
    id: 1,
  },
  {
    title: 'charmander',
    image: 4,
    id: 2,
  },
  {
    title: 'squirtle',
    image: 7,
    id: 3,
  },
])

storage.setItem('pkm:counter', 4)

const salt = crypto.randomBytes(16).toString('hex')

storage.setItem('user:data', [
  {
    email: 'admin@admin.com',
    password: {
      hash: crypto
        .pbkdf2Sync('test123', salt, 1000, 64, 'sha256')
        .toString('hex'),
      salt,
    },
  },
])
