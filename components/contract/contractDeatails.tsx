"use server";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { console } from "inspector";
import { instance } from "@/lib/instance";

export default async function ContractDeatails({ contractDetails }) {
  const reatimeData = await instance.get(
    `/api/Disponible/${contractDetails.contratId}`
  );
  console.log(reatimeData);
  return (
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
              {contractDetails.montantContrat} TND
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
            <label>Fond De garantie:</label>
            <div className="text-xs text-muted-foreground">
              {reatimeData.data.fondsDeGaranties} TND
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between">
            <label>Facture en cours:</label>
            <p className="text-xs text-muted-foreground">
              {reatimeData.data.factureEnCours}TND
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between">
            <label>Factures Approuved:</label>
            <p className="text-xs text-muted-foreground">
              {reatimeData.data.fuctureApprouved}TND
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between">
            <label>Depassement limite Acheteurs:</label>
            <p className="text-xs text-muted-foreground">
              {reatimeData.data.depassementLimiteFinancementAcheteurs}TND
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between">
            <label>Somme des limtes:</label>
            <p className="text-xs text-muted-foreground">
              {reatimeData.data.limitSum}TND
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
