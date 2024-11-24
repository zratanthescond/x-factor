import { doCredentialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Login() {
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
          <CardDescription>x-FACTOR Admin</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={doCredentialLogin}>
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
