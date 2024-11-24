import { auth } from "@/app/auth";
import axios from "axios";

export const getTocken = async () => {
  const session = await auth();

  const token = session?.token;

  return { token: token };
};

export const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    Authorization: `Bearer ${getTocken()}`,
  },
});
