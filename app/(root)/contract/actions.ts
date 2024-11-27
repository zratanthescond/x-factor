"use server";

import { instance } from "@/lib/instance";
import { redirect } from "next/navigation";

export const createContract = async (data: FormData) => {
  try {
    console.log(data);
    const contrat = {
      referenceContrat: data.get("referenceContrat"),
      dateSignContrat: data.get("dateSignContrat"),
      montantContrat: data.get("montantContrat"),
      statutContrat: data.get("statutContrat"),
      typeContrat: data.get("typeContrat"),
      deviceContrat: data.get("deviceContrat"),
      fondGarantie: data.get("fondGarantie"),
      fraisCreation: data.get("fraisCreation"),
      fraisLimite: data.get("fraisLimite"),
      dateDebContrat: data.get("dateDebContrat"),
    };
    const newContract = await instance.post("api/Contrat/contrat/new", contrat);
    return newContract.data;
  } catch (error) {
    console.log(error);
  }
};

export const linkToAcheTeur = async (formData: FormData) => {
  console.log("linkToAcheTeur");
  console.log(formData);
  console.log("linkToAcheTeur");
  // formData=new FormData(formData);
  const data = {
    contratId: formData.get("contractId"),
    adherentId: formData.get("acheteurId"), // this is the id of the user
  };
  console.log(data);
  const link = await instance.post(
    "api/Contrat/admin/linkContratToAdherent",
    data
  );

  redirect(
    `/contract/${formData.get("contractId")}?success=${new Date().getTime()}`
  );

  // return { redirect: "/" };
};
export const validateLimite = async (formData: FormData) => {
  console.log(formData);
  const action = formData.get("action");
  const data = {
    action: action,
    limiteId: parseInt(formData.get("limiteId")), // formData.get("limiteId"),
  };
  console.log(data);
  if (action !== null) {
    const response = await instance.post("api/Limite/admin/validate", data);
    redirect(`/contract/${formData.get("id")}?success=${new Date().getTime()}`);
  } else {
    console.error("Action is null");
  }
  console.log(action);
};
export const validateFinancement = async (formData: FormData) => {
  console.log(formData);
  const action = formData.get("action");
  const data = {
    action: action,
    FinancementId: parseInt(formData.get("financementId")), // formData.get("limiteId"),
  };
  console.log(data);
  if (action !== null) {
    const response = await instance.post(
      "api/Financement/admin/validate",
      data
    );
    redirect(`/contract/${formData.get("id")}?success=${new Date().getTime()}`);
  } else {
    console.error("Action is null");
  }
  console.log(action);
};
