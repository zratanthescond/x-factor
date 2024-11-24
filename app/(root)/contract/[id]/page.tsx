"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { instance } from "@/lib/instance";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ContractCard from "@/components/shared/ContractCard";
export default async function page({ params }) {
  const id = await params;
  console.log(id);

  const contract = await instance.get(`api/Contrat/admin/${id.id}`);
  const contractDetails = contract?.data;
  const individu = contractDetails.individuContrats.$values[0]?.individu;
  console.log(contractDetails);
  return (
    <Card className="flex-1 m-10 max-w-full">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Contrat details: {contract.data.referenceContrat}</CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="flex flex-col max-w-full">
        <div className="flex flex-row justify-between">
          <Card className="flex-1 m-1">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle>PréContrat Details</CardTitle>
            </CardHeader>
            <Separator className="my-1" />
            <CardContent className="p-5">
              <div className="flex flex-row justify-between">
                <label>Montant:</label>
                <div className="text-xm font-bold">
                  {contract.data.montantContrat} TND
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <label>Date de signature:</label>
                <p className="text-xs text-muted-foreground">
                  {new Date(contractDetails.dateSignContrat).toLocaleDateString(
                    "fr"
                  )}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Date de debut:</label>
                <p className="text-xs text-muted-foreground">
                  {new Date(contractDetails.dateDebContrat).toLocaleDateString(
                    "fr"
                  )}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Statut :</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.statutContrat}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Type:</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.typeContrat}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Devise:</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.deviceContrat}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Fond De garantie:</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.fondGarantie}%
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Frais de Creation:</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.fraisCreation}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <label>Frais limite:</label>
                <p className="text-xs text-muted-foreground">
                  {contractDetails.fraisLimite}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 m-1">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle>Details temp réel</CardTitle>
            </CardHeader>
            <Separator className="my-1" />
            <CardContent className="p-5">
              <div className="flex flex-row justify-between">
                <label>Montant:</label>
                <div className="text-xm font-bold">
                  {contract.data.montantContrat} TND
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <label>Date de signature:</label>
                <p className="text-xs text-muted-foreground">
                  {new Date(contractDetails.dateSignContrat).toLocaleDateString(
                    "fr"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row justify-between">
          {individu?.nom !== undefined ? (
            <Card className="flex-1 m-1">
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle>Individu Details</CardTitle>
              </CardHeader>
              <Separator className="my-1" />
              <CardContent className="p-5">
                <div className="flex flex-row justify-between">
                  <label>Nom:</label>
                  <p className="text-xs text-muted-foreground">
                    {individu.nom}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <label>Prenom:</label>
                  <p className="text-xs text-muted-foreground">
                    {individu.prenom}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <label>Tel:</label>
                  <p className="text-xs text-muted-foreground">
                    {individu.numberPhone}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <label>Email:</label>
                  <p className="text-xs text-muted-foreground">
                    {individu.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex-1 m-1">
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle>Lier un adherent</CardTitle>
              </CardHeader>
              <Separator className="my-1" />
              <CardContent className="p-5">
                <div className="flex flex-row justify-between">
                  <form className="flex flex-row justify-between w-full">
                    <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder="choisir un adherent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit" className="ml-2">
                      Lier
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Card className="max-w-full m-1">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle>Liste des bordereaus</CardTitle>
          </CardHeader>
          <Separator className="my-1" />
          <CardContent className="flex  ">
            <div className="flex">
              <ScrollArea type="always" className="w-1 flex-1">
                <div className="flex gap-2 pb-4">
                  {contractDetails.bordereau.$values.map((bordereau) => (
                    <Card key={bordereau.bordereauId}>
                      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                        <CardTitle>{bordereau?.dateBordereau}</CardTitle>
                      </CardHeader>
                      <Separator className="my-1" />
                      <CardContent className="p-5">
                        <div className="flex flex-row justify-between">
                          <label>Montant:</label>
                          <p className="text-xs text-muted-foreground">
                            {bordereau?.montantBordereau} TND
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="w-full" />
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
