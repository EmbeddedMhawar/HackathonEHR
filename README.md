# EHR Platform Test Automation Suite

This project is a test automation suite for an Electronic Health Record (EHR) platform. It uses Cucumber.js for behavior-driven development (BDD) and TypeScript for writing step definitions. The tests interact with the Hedera network for certain functionalities.

## Project Structure

The project is organized as follows:

- `features/`: This directory contains the Gherkin feature files (`.feature`). These files describe the application's behavior in a human-readable format.
  - `0PatientRegistration.feature`: Feature file for patient registration scenarios.
  - `1PatientDataSharing.feature`: Feature file for patient data sharing scenarios.
- `step_definitions/`: This directory holds the TypeScript (`.ts`) files that implement the steps defined in the Gherkin feature files.
  - `0PatientRegistration.ts`: Step definitions for patient registration features.
  - `1patientDataSharing.steps.ts`: Step definitions for patient data sharing features.

## Key Technologies

- **Cucumber.js:** A BDD framework for writing acceptance tests.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Hedera Network:** A distributed ledger technology used for specific functionalities within the EHR platform.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/EmbeddedMhawar/HackathonEHR
    cd <repository-name>
    ```
2.  **Install dependencies:**
    Ensure you have Node.js and npm installed. Then, run the following command in the project root to install the necessary packages:
    ```bash
    npm install
    ```

## Running Tests

You can run the tests using the `npx cucumber-js` command. Here are some examples:

1.  **Run all tests:**
    This command will execute all feature files found in the `features/` directory.
    ```bash
    npx cucumber-js
    ```

2.  **Run tests by tag:**
    You can run specific sets of tests by using tags defined in your feature files. For example, to run only the tests tagged as `@HappyPath`:
    ```bash
    npx cucumber-js --tags "@HappyPath"
    ```
    Similarly, to run tests tagged as `@Registration`:
    ```bash
    npx cucumber-js --tags "@Registration"
    ```
    Or to run multiple tags:
    ```bash
    npx cucumber-js --tags "@HappyPath or @Registration"
    npx cucumber-js --tags "@HappyPath and @Registration"
    ```
    and: scenario must have both tags 
    or: scenario must have either tag
   
3.  **Run a specific feature file:**
    To execute tests from a particular feature file, provide the path to the file:
    ```bash
    npx cucumber-js features/0PatientRegistration.feature
    ```
    Or for another feature:
    ```bash
    npx cucumber-js features/1PatientDataSharing.feature
    ```

## Contributing

Information on how to contribute to the project will be added here.

## License

Information about the project's license will be added here.
