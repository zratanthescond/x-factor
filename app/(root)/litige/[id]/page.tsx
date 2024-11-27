"use server";
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
import { validateLitige } from "../actions";

export default async function Bordereau({ params }) {
  const id = await params;
  const bordereauWithFacture = await instance.get(
    `api/Facture/litiges/${id.id}`
  );
  const bordereau = bordereauWithFacture.data;
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
        return (
          <Badge variant="default" className="bg-green-500 ">
            Accepté
          </Badge>
        );
        break;
      case 1:
        return <Badge variant="destructive">Refusé</Badge>;
        break;
      case 2:
        return <Badge variant="outline">En attante</Badge>;
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
            Facture Refrence: {bordereau.refFacture}{" "}
          </CardTitle>
        </CardHeader>
        <Separator className="my-1" />
        <CardContent className="p-5 max-w-full">
          <div className="flex flex-row justify-between">
            <label>Montant:</label>
            <p className="text-xs text-muted-foreground">
              {bordereau.montantDocument} TND
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Echeance:</label>
            <p className="text-xs text-muted-foreground">
              {bordereau.echeance}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Date de creation:</label>
            <p className="text-xs text-muted-foreground">
              {new Date(bordereau.dateFacture).toLocaleDateString("fr")}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Mode de reglement:</label>
            <Badge variant="outline">{bordereau.modeReglement}</Badge>
          </div>
          <Separator className="my-3" />
          <Card>
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle>Litiges</CardTitle>
            </CardHeader>
            <CardContent className="my-1 ">
              <div className="flex flex-1 flex-row max-w-fit gap-2 pb-4 ">
                <ScrollArea className=" flex-1 overflow-x-clip max-w-full">
                  <div className="flex flex-1 flex-row max-w-full gap-2 pb-4 ">
                    {bordereau.litiges.$values.map((facture) => (
                      <Card key={facture.litigeId} className="flex-1 w-96 m-1">
                        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                          <CardTitle>
                            {facture.refFacture} {FactureStatus(facture.statut)}
                          </CardTitle>
                        </CardHeader>
                        <Separator className="my-1" />
                        <CardContent className="p-5">
                          <div className="flex flex-row justify-between">
                            <label>Type litige:</label>
                            <Badge variant="secondary">
                              {facture.typeDuLitige}
                            </Badge>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex flex-row justify-between">
                            <label>Date Litige:</label>
                            <p className="text-xs text-muted-foreground">
                              {new Date(facture.dateLitige).toLocaleDateString(
                                "fr"
                              )}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between">
                            <label>Date Echeance:</label>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                facture.dateEcheanceLitige
                              ).toLocaleDateString("fr")}
                            </p>
                          </div>
                        </CardContent>
                        {facture.statut == 2 && (
                          <CardFooter>
                            <form
                              method="post"
                              action={validateLitige}
                              className="flex flex-row justify-between gap-4"
                            >
                              <input
                                type="hidden"
                                value={facture.litigeId}
                                name="litigeId"
                              />
                              <input type="hidden" value={id.id} name="id" />
                              <Button
                                type="submit"
                                value={"accept"}
                                variant="default"
                                name="action"
                                className="bg-green-500"
                                size={"sm"}
                              >
                                Accepter
                              </Button>

                              <Button
                                type="submit"
                                value={"refuse"}
                                name="action"
                                variant="destructive"
                                size={"sm"}
                              >
                                Refusé
                              </Button>
                            </form>
                          </CardFooter>
                        )}
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
