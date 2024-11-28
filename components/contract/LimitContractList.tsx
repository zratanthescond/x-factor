import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ScrollBar } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

import LimietionControl from "../shared/LimiteControl";

export function LimiteContractList({ limites }) {
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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Liste des Limites</CardTitle>
      </CardHeader>
      <Separator className="my-1" />
      <CardContent className="flex max-w-full ">
        <div className="flex min-w-full">
          {limites.$values.length > 0 ? (
            <ScrollArea className=" flex-1 overflow-x-clip">
              <div className="flex flex-1 flex-row max-w-full gap-2 pb-4  ">
                {limites.$values.map((limite) => (
                  <Card key={limite.id} className="flex-1 w-96 m-1">
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                      <CardTitle>{bordereauStaus(limite.status)}</CardTitle>
                    </CardHeader>
                    <Separator className="my-1" />
                    <CardContent className="p-5">
                      <div className="flex flex-row justify-between">
                        <label>Date de demande:</label>
                        <p className="text-xs text-muted-foreground">
                          {new Date(limite.dateDemande).toLocaleDateString(
                            "fr"
                          )}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Limite Financement:</label>
                        <p className="text-xs text-muted-foreground">
                          {limite.limiteFinancement} TND
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Date de limite:</label>
                        <p className="text-xs text-muted-foreground">
                          {new Date(limite.dateLimite).toLocaleDateString("fr")}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Limite Financement:</label>
                        <p className="text-xs text-muted-foreground">
                          {limite.limiteFinancement} TND
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Date Derniere Demande:</label>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            limite.dateDerniereDemande
                          ).toLocaleDateString("fr")}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Délai de demande:</label>
                        <p className="text-xs text-muted-foreground">
                          {limite.delaiDemande} jours
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Mode de payment:</label>

                        <Badge variant="secondary" className="flex">
                          {limite.modePaiement}
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter>
                      {limite.status === 2 && (
                        <LimietionControl
                          id={limite.contratId}
                          limiteId={limite.id}
                        />
                      )}
                    </CardFooter>
                  </Card>
                ))}
                <ScrollBar orientation="horizontal" className="w-full" />
              </div>
            </ScrollArea>
          ) : (
            <Card className="flex-1 min-w-full m-1">
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle>Aucun limites trouvées</CardTitle>
              </CardHeader>
              <Separator className="my-1" />
              <CardContent className="p-5">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-muted-foreground">
                    Aucun limites trouvé pour ce contrat{" "}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
