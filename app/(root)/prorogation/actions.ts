"use server";

import { instance } from "@/lib/instance";
import { redirect } from "next/navigation";

export const validateProrogation = async (formData: FormData) => {
  console.log(formData);
  const action = formData.get("action");
  const data = {
    action: action,
    prorogationId: formData.get("prorogationId"),
  };
  console.log(data);
  if (action !== null) {
    const response = await instance.post(
      "api/Prorogation/admin/validate",
      data
    );
    redirect(`/litige/${formData.get("id")}?success=${new Date().getTime()}`);
  } else {
    console.error("Action is null");
  }
  console.log(action);
};
