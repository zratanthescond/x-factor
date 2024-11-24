import { instance } from "@/lib/instance";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function RecentSales() {
  const sales = await instance.get("api/Individu/admin/Acheteurs");
  const acheterStatus = (paid: number, inProgress: number) => {
    if (paid == 0 && inProgress == 0) {
      return "en attente de confirmation";
    }
    if (paid > 0 && inProgress == 0) {
      return "payé";
    }

    return ` ${paid}/${inProgress} TND`;
  };
  return (
    <div className="space-y-8">
      {sales.data.$values.map((sale) => (
        <div key={sale.acheteur.individuId} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {sale.acheteur.nom[0]}
              {sale.acheteur.prenom[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.acheteur.nom} {sale.acheteur.prenom}
            </p>
            <p className="text-sm text-muted-foreground">
              {sale.acheteur.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {acheterStatus(sale.facturePaidSum, sale.factureInProgressSum)}
          </div>
        </div>
      ))}
    </div>
  );
}
