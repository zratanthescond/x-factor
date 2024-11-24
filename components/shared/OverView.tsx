import { instance } from "@/lib/instance";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default async function Overview() {
  const individu = await instance.get("api/Individu/admin/Adherents");
  return (
    <div className="space-y-8 w-full">
      {individu.data?.$values.map((indiv) => (
        <div key={indiv.adherent.individuId} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {indiv.adherent.nom[0]}
              {indiv.adherent.prenom[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {indiv.adherent.nom} {indiv.adherent.prenom}
            </p>
            <p className="text-sm text-muted-foreground">
              {indiv.adherent.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +{indiv.contratMontantCount} TND
          </div>
        </div>
      ))}
    </div>
  );
}
