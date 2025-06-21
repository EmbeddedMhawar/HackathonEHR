# EHR Platform Test Automation Suite

This project is a test automation suite for an Electronic Health Record (EHR) platform. It uses Cucumber.js for behavior-driven development (BDD) and TypeScript for writing step definitions. The tests interact with the Hedera network and Supabase for user and data management.

## Project Structure

The project is organized as follows:

- `features/`: Contains the Gherkin feature files (`.feature`). These files describe the application's behavior in a human-readable format.
  - `UserRegistration.feature`: User registration and role assignment scenarios.
  - `MedicalRecordHash.feature`: Medical record hash submission and verification scenarios.
- `features/step_definitions/`: Holds the TypeScript (`.ts`) files that implement the steps defined in the Gherkin feature files.
  - `1UserRegistration.steps.ts`: Step definitions for user registration features.
  - `MedicalRecordHash.steps.ts`: Step definitions for medical record hash features.
- `src/`: Application source code, including:
  - `index2.ts`: User registration and role assignment logic.
  - `submitMessage.ts`: Functions for submitting and verifying medical record hashes on Hedera.
  - `createHederaAccount.ts`: Utility for creating Hedera accounts.
  - `supabaseClient.ts`: Supabase client initialization.

## Key Technologies

- **Cucumber.js:** BDD framework for writing acceptance tests.
- **TypeScript:** Superset of JavaScript with static typing.
- **Hedera Network:** Distributed ledger for secure record-keeping.
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

## Contributing

Information on how to contribute to the project will be added here.

## License

Information about the project's license will be added here.
