import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/keep-alive-esm.js',
      format: 'esm',
    },
    {
      file: './dist/keep-alive-cjs.js',
      format: 'cjs',
      exports: 'default'
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
       tsconfig: "tsconfig.json",
       useTsconfigDeclarationDir: true
     }),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};
