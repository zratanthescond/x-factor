"use server";

import { instance } from "@/lib/instance";
import { redirect } from "next/navigation";

export const validateLitige = async (formData: FormData) => {
  const action = formData.get("action");
  const data = {
    action: action,
    litigeId: formData.get("litigeId"),
  };
  console.log(data);
  if (action !== null) {
    const response = await instance.post("api/Litige/admin/validate", data);
    redirect(`/litige/${formData.get("id")}?success=${new Date().getTime()}`);
  } else {
    console.error("Action is null");
  }
  console.log(action);
};
