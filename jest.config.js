module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.vue', '!**/node_modules/**'],
  coverageReporters: ['text-summary']

}
