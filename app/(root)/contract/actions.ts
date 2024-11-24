"use server";

import { instance } from "@/lib/instance";

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
