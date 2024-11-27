"use server";

import { instance } from "@/lib/instance";
import { redirect } from "next/navigation";

export const validateBordereau = async (formData: FormData) => {
  const action = formData.get("action");
  const data = {
    action: action,
    bordereauId: formData.get("bordereauId"),
  };
  console.log(data);
  if (action !== null) {
    const response = await instance.post("api/Bordereau/admin/validate", data);
    redirect(
      `/bordereau/${formData.get(
        "bordereauId"
      )}?success=${new Date().getTime()}`
    );
  } else {
    console.error("Action is null");
  }
  console.log(action);
};
