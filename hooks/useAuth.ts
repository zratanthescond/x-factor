import { auth } from "@/app/auth";
export const useAthToken = async () => {
  const session = await auth();

  const token = session?.token;
  return { token: token };
};
