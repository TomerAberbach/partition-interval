import { defineConfig } from 'tsdown/config'
import terser from '@rollup/plugin-terser'

export default defineConfig([
  {
    entry: `src/index.ts`,
    platform: `neutral`,
    sourcemap: `inline`,
    dts: false,
    publint: true,
    plugins: [
      terser({
        mangle: {
          properties: {
            regex: `^_[^_]+`,
          },
        },
      }),
    ],
  },
  {
    entry: `src/index.ts`,
    dts: { emitDtsOnly: true },
  },
])
