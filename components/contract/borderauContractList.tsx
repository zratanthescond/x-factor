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
import Link from "next/link";
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
export function BordereauContractList({ contractDetails }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Liste des bordereaux</CardTitle>
      </CardHeader>
      <Separator className="my-1" />
      <CardContent className="flex max-w-full ">
        <div className="flex min-w-full">
          {contractDetails.bordereaux.$values.length > 0 ? (
            <ScrollArea className=" flex-1 overflow-x-clip">
              <div className="flex flex-1 flex-row max-w-full gap-2 pb-4  ">
                {contractDetails.bordereaux.$values.map((bordereau) => (
                  <Card key={bordereau.bordereauId} className="flex-1 w-96 m-1">
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                      <CardTitle>{bordereauStaus(bordereau.statut)}</CardTitle>
                    </CardHeader>
                    <Separator className="my-1" />
                    <CardContent className="p-5">
                      <div className="flex flex-row justify-between">
                        <label>Montant:</label>
                        <p className="text-xs text-muted-foreground">
                          {bordereau?.montantTotal} TND
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>date:</label>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            bordereau?.dateBordereau
                          ).toLocaleString() || bordereau?.dateBordereau}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>factures:</label>
                        <p className="text-xs text-muted-foreground">
                          {bordereau?.nombreDocuments || 0}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <label>Année:</label>
                        <p className="text-xs text-muted-foreground">
                          {bordereau?.anneeBordereau}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/bordereau/${bordereau.bordereauId}`}>
                        <Button variant="link">Consulter</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
                <ScrollBar orientation="horizontal" className="w-full" />
              </div>
            </ScrollArea>
          ) : (
            <Card className="flex-1 min-w-full m-1">
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle>Aucun bordereau</CardTitle>
              </CardHeader>
              <Separator className="my-1" />
              <CardContent className="p-5">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-muted-foreground">
                    Aucun bordereau trouvé pour ce contrat{" "}
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
