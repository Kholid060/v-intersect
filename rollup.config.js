import VuePlugin from 'rollup-plugin-vue';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'v-intersect',
      file: 'dist/v-intersect.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      VuePlugin(),
    ],
    external: ['vue']
  },
  {
    input: 'src/index.js',
    output: {
      name: 'v-intersect',
      file: 'dist/v-intersect.esm.js',
      format: 'esm'
    },
    plugins: [
      VuePlugin(),
    ],
    external: ['vue']
  }
]
