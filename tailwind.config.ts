// import { defineConfig } from 'tailwindcss'
// import ui from '@nuxt/ui/tailwind'
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}'
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       dourado: '#CFAA60',       // Dourado Principal
  //       laranja: '#EBB855',       // Dourado Complementar
  //       offWhite: '#EFE8E0',      // Off-white
  //       azulEscuro: '#0C1C2C',    // Azul Escuro (Forte)
  //       azulClaro: '#54ABDD',     // Azul Claro (Céu)
  //     }
  //   }
  // }
}