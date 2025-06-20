// cucumber.js
module.exports = {
  default: {
    // Tell Cucumber to use ts-node to execute your .ts files
    // This MUST be an array.
    requireModule: ['ts-node/register'],

    // Tell Cucumber where to find your step definition files
    // This path should match your project structure.
    require: ['features/**/*.steps.ts'],

    // Optional: Configure reporters for better output
    format: [
      'summary',
      'progress-bar',
    ]
  },
};