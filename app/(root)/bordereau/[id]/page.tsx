"use server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { instance } from "@/lib/instance";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { validateBordereau } from "../actions";
import { resolveRefs } from "@/lib/utils";

export default async function Bordereau({ params }) {
  const id = await params;
  const bordereauWithFacture = await instance.get(
    `/api/Bordereau/factures/${id.id}`
  );
  const bordereau = resolveRefs(bordereauWithFacture.data);
  console.log(bordereau.factures);
  function bordereauStaus(status) {
    switch (status) {
      case 2:
        return <Badge variant="outline">En cours</Badge>;
        break;
      case 1:
        return <Badge variant="destructive">Annule</Badge>;
        break;
      case 0:
        return (
          <Badge variant="default" className="bg-green-500">
            Accepté
          </Badge>
        );
        break;

      default:
        return status;
        break;
    }
  }
  function FactureStatus(status) {
    switch (status) {
      case 0:
        return <Badge variant="destructive">Payer</Badge>;
        break;
      case 2:
        return <Badge variant="default">En attente</Badge>;
        break;
      case 1:
        return <Badge variant="outline">En cours</Badge>;
      default:
        return status;
        break;
    }
  }
  return (
    <div className="flex flex-1 p-3 max-w-full">
      <Card className="flex-1 max-w-full">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="flex flex-row items-center justify-center gap-4">
            {bordereauStaus(bordereau?.statut)}{" "}
            {bordereau?.statut == 2 && (
              <form
                action={validateBordereau}
                className="flex flex-1 w-full flex-row items-center justify-between gap-4 space-y-0 p-2 border-2 rounded-lg"
              >
                <input
                  type="hidden"
                  value={bordereau.bordereauId}
                  name="bordereauId"
                />
                <Button
                  type="submit"
                  name="action"
                  className="bg-green-500"
                  size={"sm"}
                  value={"accept"}
                >
                  Accepter
                </Button>
                <Button
                  type="submit"
                  name="action"
                  className="bg-red-500"
                  size={"sm"}
                  value={"refuse"}
                >
                  Refusé
                </Button>
              </form>
            )}
          </CardTitle>
        </CardHeader>
        <Separator className="my-1" />
        <CardContent className="p-5 max-w-full">
          <div className="flex flex-row justify-between">
            <label>Montant:</label>
            <p className="text-xs text-muted-foreground">
              {bordereau.montantTotal} TND
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>date:</label>
            <p className="text-xs text-muted-foreground">
              {new Date(
                bordereauWithFacture.data.dateBordereau
              ).toLocaleDateString("fr")}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Nombre de factures:</label>
            <p className="text-xs text-muted-foreground">
              {bordereau.nombreDocuments}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Année</label>
            <p className="text-xs text-muted-foreground">
              {bordereau.anneeBordereau}
            </p>
          </div>
          <Separator className="my-3" />
          <Card>
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle>Factures</CardTitle>
            </CardHeader>
            <CardContent className="my-1 ">
              <div className="flex flex-1 flex-row max-w-fit gap-2 pb-4 ">
                <ScrollArea className=" flex-1 overflow-x-clip max-w-full">
                  <div className="flex flex-1 flex-row max-w-full gap-2 pb-4 ">
                    {bordereau.factures.$values.map((facture) => (
                      <Card key={facture.factureId} className="flex-1 w-96 m-1">
                        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                          <CardTitle>
                            {facture.refFacture} {FactureStatus(facture.status)}
                          </CardTitle>
                        </CardHeader>
                        <Separator className="my-1" />
                        <CardContent className="p-5">
                          <div className="flex flex-row justify-between">
                            <label>Montant:</label>
                            <p className="text-xs text-muted-foreground">
                              {facture?.montantDocument} TND
                            </p>
                          </div>
                          <div className="flex flex-row justify-between">
                            <label>Echeance:</label>
                            <p className="text-xs text-muted-foreground">
                              {facture.echeance}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between">
                            <label>Date Facture:</label>
                            <p className="text-xs text-muted-foreground">
                              {new Date(facture.dateFacture).toLocaleDateString(
                                "fr"
                              )}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between">
                            <label>Mode de reglement:</label>
                            <p className="text-xs text-muted-foreground">
                              {facture.modeReglement}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between border-2 rounded-lg p-2">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src="/avatars/01.png" alt="Avatar" />
                              <AvatarFallback>
                                {facture.individu.nom[0]}
                                {facture.individu.prenom[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {facture.individu.nom} {facture.individu.prenom}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {facture.individu.email}
                              </p>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter>
                          <div className="flex flex-row justify-between">
                            <Link href={`/litige/${facture.factureId}`}>
                              <Button variant="link">Litige</Button>
                            </Link>
                            <Link href={`/prorogation/${facture.factureId}`}>
                              <Button variant="link">Prorogation</Button>
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar
                    className="flex-1"
                    orientation="horizontal"
                  ></ScrollBar>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
