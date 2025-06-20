# Repository Summary: hackathon-ehr

## Project Overview

The project, named "hackathon-ehr," is an Electronic Health Record (EHR) system. It utilizes the Hedera network to manage decentralized identities for patients (Hedera Account IDs) and to log consent for data sharing via the Hedera Consensus Service (HCS). The system appears to involve a patient-facing application (referred to as "EHR web app" or "EHR mobile app") and a "doctor portal." Medical records themselves are described as being "stored and encrypted off-chain."

## Key Features Being Tested

The testing is structured using Behavior-Driven Development (BDD) with Cucumber. The two main features defined are:

1.  **Patient Account Registration:**
    *   New users can register on the platform.
    *   Upon successful registration, a unique Hedera Account ID is created and associated with the platform account.
    *   The system handles cases where a user tries to register with an email that is already in use.
    *   Validation of the Hedera Account ID format ("0.0.XXXXX").

2.  **Patient Data Sharing with a Doctor (Consent Management):**
    *   Patients can grant access to their medical records to registered doctors.
    *   The process involves the patient presenting a QR code, the doctor scanning it, and the patient approving the access request on their app.
    *   Upon approval, the doctor can view the patient's medical records.
    *   All access grants are recorded as immutable messages on the Hedera Consensus Service (HCS), detailing the granter, grantee, permission, and status.

## Main Technologies and Dependencies

*   **Runtime Environment**: Node.js
*   **Programming Language**: TypeScript
*   **Testing Framework**: Cucumber (for BDD)
    *   `@cucumber/cucumber`
    *   `@cucumber/pretty-formatter`
*   **TypeScript Support**:
    *   `typescript`
    *   `ts-node` (for running TypeScript files directly)
    *   `@types/node` (Node.js type definitions)
*   **Distributed Ledger Technology**: Hedera Network
    *   Used for decentralized identity (Account IDs).
    *   Used for logging consent (Hedera Consensus Service - HCS).
*   **Build/Configuration**: `cucumber.tsconfig.json` for TypeScript compilation settings related to Cucumber tests.

## Important Note on Test Implementation

The step definition files (`0PatientRegistration.ts`, `1patientDataSharing.steps.ts`) indicate that while the feature files and step definitions are in place, the actual JavaScript/TypeScript code to execute the test steps (e.g., making API calls, interacting with a database, mocking services) is **pending implementation**. The existing code consists of placeholder comments for what needs to be done.
