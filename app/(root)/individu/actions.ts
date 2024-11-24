"use server";
import { instance } from "@/lib/instance";

export const createIndividuAction = async (data: FormData) => {
  try {
    console.log(data);
    const individu = {
      nom: data.get("nom"),
      prenom: data.get("prenom"),
      email: data.get("email"),
      password: data.get("password"),
      isAdmin: false,
      numberPhone: data.get("numberPhone"),
    };
    const newIndividu = await instance.post("api/Individu/create", individu);
    return newIndividu.data;
  } catch (error) {
    console.log(error);
  }
};
