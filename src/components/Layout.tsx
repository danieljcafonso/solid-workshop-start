import { A } from '@solidjs/router'
import { ParentProps } from 'solid-js'
import { DiscordIcon, Logo } from './Logo'

export function Layout(props: ParentProps) {
  return (
    <div class="min-h-screen bg-slate-200 text-black">
      <header class="sticky top-0 z-50 flex items-center justify-between bg-sky-700 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none backdrop-blur text-slate-200">
        <div class="grid lg:grid-cols-[1fr1fr] grid-cols-2 py-2 px-8 items-center w-full max-w-8xl mx-auto ">
          <div class="flex justify-start gap-2">
            <div class="flex justify-start gap-2">
              <A href="/" aria-label="Home page">
                <Logo class="h-9" />
              </A>
            </div>
          </div>

          <div class="lg:order-2 self-center flex basis-0 gap-4 items-center justify-end order-">
            <A
              href="https://discord.com/invite/solidjs"
              class="group"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon class="h-6 w-6 fill-slate-200 group-hover:fill-white" />
            </A>
          </div>
        </div>
      </header>
      {props.children}
    </div>
  )
}
