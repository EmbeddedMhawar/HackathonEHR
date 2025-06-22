Feature: Patient Account Registration
  As a new user of the EHR platform
  I want to sign up for a patient account
  So that I can access my medical information securely

  Background:
    Given the EHR platform is connected to Supabase

  Scenario: Successful patient registration
    Given a new patient provides the following details for registration:
      | field         | value                   |
      | email         | "new.patient@example.com" |
      | password      | "aVerySecureP@ssw0rd"   |
      | first_name    | "Jane"                  |
      | last_name     | "Doe"                   |
      | gender        | "female"                |
      | birth_date    | "1990-05-15"            |
      | phone         | "1234567890"            |
    When the patient submits their registration form
    Then a new Supabase Auth user account should be created
    And a new record should be added to the "users" table with the role "patient"
    And a new record should be added to the "patients_info" table with their details
    And the registration process should complete successfully

  Scenario: Attempting to register with an email that already exists
    Given a user with the email "existing.patient@example.com" already has an account
    When a new patient attempts to register with the email "existing.patient@example.com"
    Then the system should report an error that the user already exists
    And no new user records should be created