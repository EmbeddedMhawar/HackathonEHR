import { supabase } from "./supabaseClient";
import { createHederaAccount } from "./createHederaAccount";

type UserInput = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  date_of_birth: string;
  gender: "male" | "female";
  role: "doctor" | "pharmacist" | "lab";
};
// exemple data
const users: UserInput[] = [
  {
    user_id: "dc5f44aa-12a2-4d1f-8e4e-abc123def456",
    first_name: "Akram",
    last_name: "AIT LAMINE",
    email: "akramaitlamine@gmail.com",
    phone: "+212633435049",
    password: "StrongPass123",
    date_of_birth: "2003-07-10",
    gender: "male",
    role: "doctor",
  },
];

async function createUser(user: UserInput) {
  const full_name = `${user.first_name} ${user.last_name}`;
  // 1. Create Supabase Auth user
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    phone: user.phone,
    password: user.password,
    email_confirm: true,
  });

  if (error || !data?.user) {
    console.error("❌ Error creating user:", error);
    return;
  }
  // 2. Create Hedera account and keys
  const hederaAccount = await createHederaAccount();
  // 3. Insert into global users table
  const { error: userInsertError } = await supabase.from("users").insert({
    id: data.user.id,
    full_name: full_name,
    email: user.email,
    role: user.role,
    hedera_account_id: hederaAccount.accountId,
    hedera_private_key: hederaAccount.privateKey,
    hedera_public_key: hederaAccount.publicKey,
  });

  if (userInsertError) {
    console.error("❌ Error inserting into users table:", userInsertError);
    return;
  }

  // 4. Insert into role-specific table
  const roleData = {
    user_id: data.user.id,
    phone: user.phone,
    first_name: user.first_name,
    last_name: user.last_name,
    date_of_birth: user.date_of_birth,
    gender: user.gender,
  };

  let insertResult;
  switch (user.role) {
    case "doctor":
      insertResult = await supabase.from("doctors").insert(roleData);
      break;
    case "pharmacist":
      insertResult = await supabase.from("pharmacists").insert(roleData);
      break;
    case "lab":
      insertResult = await supabase.from("labs").insert(roleData);
      break;
    default:
      console.error("❌ Unknown role:", user.role);
      return;
  }

  if (insertResult.error) {
    console.error(
      `❌ Error inserting into ${user.role} table:`,
      insertResult.error
    );
  } else {
    console.log(`✅ ${user.role} created successfully.`);
  }
}

async function run() {
  await createUser(users[0]);
}
