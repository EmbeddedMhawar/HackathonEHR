
Feature: Patient Account Registration
  As a new user of the EHR platform,
  I want to create a secure personal account,
  So that I can receive a unique decentralized identity (Hedera Account ID) to manage my medical records.

  Background:
    Given the EHR platform is connected to the Hedera network

  @HappyPath @Registration
  Scenario: A new user successfully registers and is assigned a Hedera Account ID
    Given Sarah is a new user on the platform's registration page
    When she provides the following registration details:
      | Field    | Value                  |
      | Name     | "Sarah Connor"         |
      | Email    | "sarah.connor@test.com"|
      | Password | "CyberdyneSucks!123"   |
    And she submits the registration request

    Then a new platform account should be successfully created for "sarah.connor@test.com"
    And a new Hedera account should be created and associated with her platform account
    And her patient dashboard should display her new unique Hedera Account ID
    And the displayed Hedera Account ID must be in the valid format of "0.0.XXXXX"

  @ErrorPath @Registration
  Scenario: A user attempts to register with an email that is already in use
    Given Alex is a registered patient with the Hedera account ID "0.0.67890" and email "alex@example.com"
    And a new user is on the platform's registration page
    When they provide the following registration details:
      | Field    | Value                  |
      | Name     | "Another Alex"         |
      | Email    | "alex@example.com"     |
      | Password | "DifferentPass!789"    |
    And they submit the registration request

    Then they should be shown an error message indicating the email is already registered
    And no new Hedera account should be created for this request