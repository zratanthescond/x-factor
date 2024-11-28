"use server";

import { redirect, RedirectType } from "next/navigation";
import { signIn, signOut } from "../auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  if (action !== null) {
    await signIn(action?.toString(), { redirectTo: "/home" });
  } else {
    console.error("Action is null");
  }
  console.log(action);
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}
