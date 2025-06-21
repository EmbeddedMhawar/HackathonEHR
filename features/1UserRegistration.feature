Feature: User Registration and Role Assignment
  As an admin or system
  I want to register users and assign them to the correct role-specific tables
  So that each user has a Hedera account and is stored in the right place

  Background:
    Given the Supabase and Hedera services are available

  Scenario: Registering a new doctor
    Given a new user provides the following information:
      | first_name | last_name | email                   | phone         | password       | date_of_birth | gender | role    |
      | Akram      | AIT LAMINE| akramaitlamine@gmail.com| +212633435049 | StrongPass123  | 2003-07-10    | male   | doctor  |
    When the registration is submitted
    Then a new Supabase Auth user should be created
    And a new Hedera account should be created and linked
    And the user should be inserted into the global users table
    And the user should be inserted into the doctors table
    And the system should display a success message

  Scenario: Registering a new pharmacist
    Given a new user provides the following information:
      | first_name | last_name | email                | phone         | password       | date_of_birth | gender | role       |
      | Sara       | Smith     | sara.smith@email.com | +212600000000 | PassPharma123  | 1990-01-01    | female | pharmacist |
    When the registration is submitted
    Then a new Supabase Auth user should be created
    And a new Hedera account should be created and linked
    And the user should be inserted into the global users table
    And the user should be inserted into the pharmacists table
    And the system should display a success message

  Scenario: Registering a new lab user
    Given a new user provides the following information:
      | first_name | last_name | email             | phone         | password     | date_of_birth | gender | role |
      | John       | Doe       | john.doe@lab.com  | +212611111111 | LabPass123   | 1985-05-05    | male   | lab  |
    When the registration is submitted
    Then a new Supabase Auth user should be created
    And a new Hedera account should be created and linked
    And the user should be inserted into the global users table
    And the user should be inserted into the labs table
    And the system should display a success message
