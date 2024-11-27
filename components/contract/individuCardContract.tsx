import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function IndividuCardContract({ individu }) {
  return (
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
          <p className="text-xs text-muted-foreground">{individu.prenom}</p>
        </div>

        <div className="flex flex-row justify-between">
          <label>Tel:</label>
          <p className="text-xs text-muted-foreground">
            {individu.numberPhone}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <label>Email:</label>
          <p className="text-xs text-muted-foreground">{individu.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
