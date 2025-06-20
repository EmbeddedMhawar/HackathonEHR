
Feature: Patient Data Sharing with a Doctor
  As a Patient,
  I want to securely share my medical records with a doctor for a limited time,
  So that they can provide me with an accurate diagnosis while I maintain control over my data.

  Background:
    Given the EHR platform is connected to the Hedera network
    And Dr. Smith is a registered and verified doctor with the Hedera account ID "0.0.12345"
    And Alex is a registered patient with the Hedera account ID "0.0.67890"
    And Alex has a previous medical record stored and encrypted off-chain:
      | Record Type | Details                 | Date       |
      | Diagnosis   | "Seasonal Allergies"    | 2024-05-10 |
    And Alex has not previously granted access to Dr. Smith
    
@HappyPath @ConsentManagement
Scenario: Patient successfully shares medical records with a doctor for a consultation
    Given Alex is at a consultation with Dr. Smith
    When Alex presents his personal QR code from the EHR web app
    And Dr. Smith scans the QR code using the platform's doctor portal
    And the system prompts Alex on his app to grant access to Dr. Smith
    And Alex approves the access request for his full record history

    Then Dr. Smith's dashboard should successfully display Alex's medical records
    And Dr. Smith should be able to view the diagnosis record for "Seasonal Allergies"
    And a new message should be submitted to the Hedera Consensus Service (HCS)
    And the HCS message log for Alex's topic should contain a new immutable entry confirming:
    | GranterAccount | GranteeAccount | Permission | Status    |
    | 0.0.67890      | 0.0.12345      | ReadAccess | GRANTED   |
