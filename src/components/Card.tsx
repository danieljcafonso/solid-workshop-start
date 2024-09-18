import { A } from '@solidjs/router'
import { Pokemon } from '~/lib/db'

interface Props {
  pokemon: Pokemon
}

export function Card(props: Props) {
  return (
    <A
      href={`/pokemon/${props.pokemon.id}`}
      class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center"
    >
      <img
        class="w-52"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.image}.png`}
        alt="a pokemon image"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{props.pokemon.title}</div>
      </div>
    </A>
  )
}
