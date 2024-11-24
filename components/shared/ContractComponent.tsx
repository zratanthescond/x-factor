"use server";
import { instance } from "@/lib/instance";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { console } from "inspector";

export default async function contractComponent(id) {
  const contract = await instance.get(`api/Contrat/admin/${icContract}`);
  const contractDetails = contract?.data;
  const individu = contractDetails.individuContrats.$values[0]?.Individu;
  console.log(contractDetails);
  return (
    <Card className="flex-1 m-10">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Contrat details: {contract.data.referenceContrat}</CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent>
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
        <div class="flex flex-row justify-between">
          <Card className="flex-1 m-1">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle>Individu Details</CardTitle>
            </CardHeader>
            <Separator className="my-1" />
            <CardContent className="p-5">
              <div className="flex flex-row justify-between">
                <label>Nom:</label>
                <p className="text-xs text-muted-foreground">{individu.nom}</p>
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
        </div>
      </CardContent>
    </Card>
  );
}
