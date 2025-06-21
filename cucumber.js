// cucumber.js
module.exports = {
  default: {
    // Tell Cucumber to use ts-node to execute your .ts files
    requireModule: ['ts-node/register'],

    // Tell Cucumber where to find your step definition files
    require: ['features/**/*.steps.ts'],

    // Optional: Configure reporters for better output
    format: [
      'summary',
      'progress-bar',
    ]
  },
};