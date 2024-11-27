"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { instance } from "@/lib/instance";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IndividuCardContract } from "@/components/contract/individuCardContract";
import { IndividuForm } from "@/components/contract/individuForm";
import ContractDeatails from "@/components/contract/contractDeatails";
import { BordereauContractList } from "@/components/contract/borderauContractList";
import { LimiteContractList } from "@/components/contract/LimitContractList";
import { FinancementContractList } from "@/components/contract/FinancementContractList";
export default async function page({ params }) {
  const id = await params;
  console.log(id);

  const contract = await instance.get(`api/Contrat/admin/${id.id}`);
  const contractDetails = contract?.data;
  const individu = contractDetails.individuContrats.$values[0]?.individu;
  console.log(contractDetails);
  return (
    <Card className="flex-1  max-w-full ">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle>Contrat details: {contract.data.referenceContrat}</CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="flex flex-col max-w-full">
        <ContractDeatails contractDetails={contractDetails} />
        <Separator className="my-2" />
        <div className="flex flex-row justify-between">
          {individu?.nom !== undefined ? (
            <IndividuCardContract individu={individu} />
          ) : (
            <IndividuForm contractId={id.id} />
          )}
        </div>
        <Separator className="my-2" />
        <BordereauContractList contractDetails={contractDetails} />
        <Separator className="my-2" />
        <LimiteContractList limites={contractDetails.limites} />
        <Separator className="my-2" />
        <FinancementContractList financement={contractDetails.financements} />
      </CardContent>
    </Card>
  );
}
