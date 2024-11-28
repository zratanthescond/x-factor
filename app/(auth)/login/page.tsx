"use client";
import { doCredentialLogin } from "@/app/actions";
import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function Login() {
  const hadnleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await doCredentialLogin(formData);
    if (res) {
      redirect("/");
      console.log(res);
    }
  };
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
          <CardDescription>x-FACTOR Admin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => hadnleFormSubmit(e)} method="post">
            <div className="flex flex-col p-5 m-3 gap-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                name="email"
                id="email"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                name="password"
                id="password"
              />
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p>X-factor Admin team &copy; 2024</p>
        </CardFooter>
      </Card>
    </div>
  );
}
