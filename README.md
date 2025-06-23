# EHR Platform Test Automation Suite

This project is a test automation suite for an Electronic Health Record (EHR) platform. It uses Cucumber.js for behavior-driven development (BDD) and TypeScript for writing step definitions. The tests interact with the Hedera network and Supabase for user and data management.

## Project Structure

The project is organized as follows:

- `features/`: Contains the Gherkin feature files (`.feature`). These files describe the application's behavior in a human-readable format.
  - `UserRegistration.feature`: User registration and role assignment scenarios.
  - `MedicalRecordHash.feature`: Medical record hash submission and verification scenarios.
- `features/step_definitions/`: Holds the TypeScript (`.ts`) files that implement the steps defined in the Gherkin feature files.
  - `0MedicalRecordHash.steps.ts`: Step definitions for medical record hash submission and verification.
  - `1UserRegistration.steps.ts`: Step definitions for user registration features.
  - `2PatientRegistration.steps.ts`: Step definitions for patient registration scenarios.
- `src/`: Application source code, including:
  - `index0.ts`: Contains logic for medical record hash submission and verification.
  - `index1.ts`: Handles user registration and role assignment.
  - `submitMessage.ts`: Functions for submitting and verifying medical record hashes on Hedera.
  - `createHederaAccount.ts`: Utility for creating Hedera accounts.
  - `supabaseClient.ts`: Supabase client initialization.

## Key Features

The primary features of this EHR platform, as covered by the test suite, include:

1.  **Patient Account Registration:**
    *   Enables new users to register on the platform.
    *   Creates a unique Hedera Account ID upon successful registration and links it to the platform account.
    *   Handles scenarios such as registration attempts with an existing email.
    *   Validates the format of Hedera Account IDs (e.g., "0.0.XXXXX").

2.  **Patient Data Sharing with a Doctor (Consent Management):**
    *   Allows patients to grant access to their medical records to registered doctors.
    *   Involves a QR code-based workflow for initiating access requests.
    *   Records all access grants as immutable messages on the Hedera Consensus Service (HCS), detailing the granter, grantee, permission, and status.
    *   Medical records themselves are stored and encrypted off-chain.

## Key Technologies

- **Node.js:** JavaScript runtime environment.
- **TypeScript:** Superset of JavaScript with static typing.
- **Cucumber.js:** BDD framework for writing acceptance tests.
  - `@cucumber/cucumber`
  - `@cucumber/pretty-formatter`
- **TS-Node:** TypeScript execution environment for Node.js.
- **Hedera Network:** Distributed ledger for decentralized identity (Account IDs) and secure record-keeping (Hedera Consensus Service - HCS).
- **Supabase:** Backend-as-a-service for authentication and database.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/EmbeddedMhawar/HackathonEHR
    cd HackathonEHR
    ```
2.  **Install dependencies:**
    Ensure you have Node.js and npm installed. Then, run:
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env` file in the project root with your Hedera and Supabase credentials:
    ```env
    MY_ACCOUNT_ID=0.0.xxxx
    MY_PRIVATE_KEY=302exxx
    TOPIC_ID=0.0.xxxxx
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

## Running Tests

You can run the tests using the `npx cucumber-js` command. Here are some examples:

1.  **Run all tests:**
    ```bash
    npx cucumber-js
    ```
2.  **Run tests by tag:**
    ```bash
    npx cucumber-js --tags "@HappyPath"
    npx cucumber-js --tags "@Registration"
    npx cucumber-js --tags "@HappyPath or @Registration"
    npx cucumber-js --tags "@HappyPath and @Registration"
    ```
3.  **Run a specific feature file:**
    ```bash
    npx cucumber-js features/UserRegistration.feature
    npx cucumber-js features/MedicalRecordHash.feature
    ```

## Important Note on Test Implementation

While the feature files (`.feature`) and step definitions (`.ts`) are in place, the actual JavaScript/TypeScript code to execute the test steps (e.g., making API calls, interacting with a database, mocking services) is **pending implementation**. The existing step definition files currently contain placeholder comments indicating the actions to be implemented.
