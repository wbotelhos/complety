import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/app/javascript/$1' },
  setupFilesAfterEnv: ['./__tests__/spec_helper.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*_spec.ts'],
  verbose: true,
};

export default config;
