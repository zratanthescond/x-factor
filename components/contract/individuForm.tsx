"use server";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { instance } from "@/lib/instance";
import { console } from "inspector";
import { linkToAcheTeur } from "@/app/(root)/contract/actions";

export async function IndividuForm({
  contractId,
}: {
  contractId: number;
}): Promise<JSX.Element> {
  const individu = await instance.get("/api/Individu/individus");
  console.log(individu.data);

  return (
    <Card className="flex-1 m-1">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Lier un adherent</CardTitle>
      </CardHeader>
      <Separator className="my-1" />
      <CardContent className="p-5">
        <div className="flex flex-row justify-between">
          <form
            className="flex flex-row justify-between w-full"
            method="post"
            action={linkToAcheTeur}
          >
            <input type="hidden" value={contractId} name="contractId" />
            <Select name="acheteurId">
              <SelectTrigger className="">
                <SelectValue placeholder="choisir un adherent" />
              </SelectTrigger>
              <SelectContent>
                {individu?.data?.$values.map((indiv) => (
                  <SelectItem
                    key={indiv.individuId}
                    value={indiv.individuId.toString()}
                  >
                    {indiv.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="ml-2">
              Lier
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
