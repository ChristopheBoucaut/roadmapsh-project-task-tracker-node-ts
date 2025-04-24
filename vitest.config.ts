import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            enabled: true,
            exclude: [
                './src/config/**',
                './src/interface/**',
                ...coverageConfigDefaults.exclude,
            ]
        }
    },
})
