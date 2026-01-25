"use server";

export async function checkAdminPassword(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) return false;

  return password === correctPassword;
}
