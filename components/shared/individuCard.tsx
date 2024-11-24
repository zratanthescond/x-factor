import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import Overview from "./OverView";
import RecentSales from "./RecentSales";
import { PlusIcon } from "lucide-react";

export default function IndividuCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Adherent</CardTitle>
          <Link href="/individu/new">
            <Button size={"icon"}>
              <PlusIcon className=" h-20 w-20" strokeWidth={5} size={30} />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <div className=" items-center flex flex-row justify-between w-full">
            <CardTitle>Acheteur</CardTitle>{" "}
            <Link href="/individu/new">
              <Button size={"icon"}>
                <PlusIcon className=" h-20 w-20" strokeWidth={5} size={30} />
              </Button>
            </Link>
          </div>
          <CardDescription>facture payé / facture en cours.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
    </div>
  );
}
