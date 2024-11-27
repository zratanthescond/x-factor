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
import { validateProrogation } from "../actions";
import ProrogationControl from "@/components/shared/ProrogationControl";

export default async function Bordereau({ params }) {
  const id = await params;
  const bordereauWithFacture = await instance.get(
    `/api/Facture/prorogations/${id.id}`
  );
  const bordereau = bordereauWithFacture.data;

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
            {FactureStatus(bordereau?.status)}{" "}
            {bordereau?.statut == 2 && (
              <div className="flex flex-1 w-full flex-row items-center justify-between gap-4 space-y-0 p-2 border-2 rounded-lg">
                <Button className="bg-green-500" size={"sm"}>
                  Accepter
                </Button>
                <Button className="bg-red-500" size={"sm"}>
                  Refusé
                </Button>
              </div>
            )}
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
              <CardTitle>List des prorogations</CardTitle>
            </CardHeader>
            <CardContent className="my-1 ">
              <div className="flex flex-1 flex-row max-w-fit gap-2 pb-4 ">
                <ScrollArea className=" flex-1 overflow-x-clip max-w-full">
                  <div className="flex flex-1 flex-row max-w-full gap-2 pb-4 ">
                    {bordereau.prorogations.$values.map((prorogation) => (
                      <Card
                        key={prorogation.prorogationId}
                        className="flex-1 w-96 m-1"
                      >
                        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                          <CardTitle>
                            {FactureStatus(prorogation.statut)}
                          </CardTitle>
                        </CardHeader>
                        <Separator className="my-1" />
                        <CardContent className="p-5">
                          <div className="flex flex-row justify-between">
                            <label>Echeance:</label>
                            <Badge variant="secondary">
                              {new Date(
                                prorogation.echeance
                              ).toLocaleDateString("fr")}
                            </Badge>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex flex-row justify-between">
                            <label>Motif Prorogation:</label>
                            <Badge className="bg-green-500">
                              {prorogation.motifProrogation}
                            </Badge>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex flex-row justify-between">
                            <label>Date Echeance apres prorogation:</label>
                            <Badge variant="secondary">
                              {new Date(
                                prorogation.dateEcheanceApresProrogation
                              ).toLocaleDateString("fr")}
                            </Badge>
                          </div>
                        </CardContent>
                        {prorogation.statut == 2 && (
                          <ProrogationControl
                            id={id.id}
                            prorogationId={prorogation.prorogationId}
                          />
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
