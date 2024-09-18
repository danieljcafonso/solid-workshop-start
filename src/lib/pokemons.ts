import { storage, Pokemon } from './db'

export const getPokemons = async () => {
  return ((await storage.getItem('pkm:data')) as Pokemon[]).reverse()
}

export const getPokemon = async (id: number) => {
  return ((await storage.getItem('pkm:data')) as Pokemon[]).find(
    (pkm) => pkm.id === id
  )
}

export const addPkm = async (data: FormData) => {
  const pkmInput = Object.fromEntries(data.entries())

  let [{ value: pkm }, { value: index }] = await storage.getItems([
    'pkm:data',
    'pkm:counter',
  ])

  let pokemon
  await Promise.all([
    storage.setItem('pkm:data', [
      ...(pkm as Pokemon[]),
      (pokemon = { ...pkmInput, id: index as number, timestamp: Date.now() }),
    ]),
    storage.setItem('pkm:counter', (index as number) + 1),
  ])

  return pokemon
}
