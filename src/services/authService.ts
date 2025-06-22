// src/services/authService.ts
import { supabase } from "../supabaseClient";

interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  phone: string;
}

export async function signUpPatient(data: SignupData) {
  // 1. Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        phone: data.phone,
      },
    },
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || "Error creating user account");
  }

  const userId = authData.user.id;

  // 2. Insert into users table
  const fullName = `${data.first_name} ${data.last_name}`;
  const { error: userInsertError } = await supabase.from("users").insert({
    id: userId,
    full_name: fullName,
    email: data.email,
    role: "patient",
  });

  if (userInsertError) {
    throw new Error("Error inserting into users table");
  }

  // 3. Insert into patients_info table
  const { error: patientInfoError } = await supabase.from("patients_info").insert({
    user_id: userId,
    phone: data.phone,
    first_name: data.first_name,
    last_name: data.last_name,
    date_of_birth: data.birth_date || null,
    gender: data.gender,
  });

  if (patientInfoError) {
    throw new Error("Error inserting patient info");
  }

  return true;
}
