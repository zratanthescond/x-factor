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
import { Button } from "../ui/button";
import FinanacementControl from "../shared/FinanacementControl";

export function FinancementContractList({ financement }) {
  function FinancementStatus(status) {
    switch (status) {
      case "Pending":
        return <Badge variant="outline">En cours</Badge>;
        break;
      case "Rejected":
        return <Badge variant="destructive">Refusé</Badge>;
        break;
      case "Approved":
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
        <CardTitle>Liste des financement</CardTitle>
      </CardHeader>
      <Separator className="my-1" />
      <CardContent className="flex max-w-full ">
        <div className="flex min-w-full">
          {financement.$values.length > 0 ? (
            <ScrollArea className=" flex-1 overflow-x-clip">
              <div className="flex flex-1 flex-row max-w-full gap-2 pb-4  ">
                {financement.$values.map((financement) => (
                  <Card
                    key={financement.financementId}
                    className={
                      "flex-1 w-96 m-1 " +
                      `${
                        financement.typeDeFinancement == "LiberationFDG"
                          ? "bg-pink-100"
                          : "bg-indigo-100"
                      }`
                    }
                  >
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                      <CardTitle>
                        {FinancementStatus(financement?.statutFinancement)}
                      </CardTitle>
                    </CardHeader>
                    <Separator className="my-1" />
                    <CardContent className="p-5">
                      <div className="flex flex-row justify-between">
                        <label>Type de financement:</label>

                        <Badge className="bg-indigo-500">
                          {financement?.typeDeFinancement}
                        </Badge>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex flex-row justify-between">
                        <label>Montant de financement:</label>

                        <p className="text-xs text-muted-foreground">
                          {financement?.montantFinancement} TND
                        </p>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex flex-row justify-between">
                        <label>Date de financement:</label>

                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            financement?.dateDeFinancement
                          ).toLocaleDateString("fr")}
                        </p>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex flex-row justify-between">
                        <label>Methode de payment:</label>

                        <p className="text-xs text-muted-foreground">
                          <Badge variant="secondary">
                            {financement?.methodeDePaiement}
                          </Badge>
                        </p>
                      </div>
                    </CardContent>

                    {financement?.statutFinancement == "Pending" && (
                      <FinanacementControl
                        financementId={financement.financementId}
                        id={financement.contratId}
                      />
                    )}
                  </Card>
                ))}
                <ScrollBar orientation="horizontal" className="w-full" />
              </div>
            </ScrollArea>
          ) : (
            <Card className="flex-1 min-w-full m-1">
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle>Aucun financement trouvées</CardTitle>
              </CardHeader>
              <Separator className="my-1" />
              <CardContent className="p-5">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-muted-foreground">
                    Aucun financement trouvé pour ce contrat{" "}
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
