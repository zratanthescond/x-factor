import ContractCard from "@/components/shared/ContractCard";
import IndividuCard from "@/components/shared/individuCard";
import SearchInput from "@/components/shared/searchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerDemo } from "@/components/ui/dateTimePicker";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { instance } from "@/lib/instance";

export default async function page() {
  const contracts = await instance.get("api/Contrat/contrats");

  return (
    <div className="flex w-full flex-col items-center justify-start p-10">
      <Card className=" flex flex-col max-w-full w-full mx-10">
        <CardHeader className="w-full flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DatePickerDemo />
        </CardHeader>
        <CardContent>
          <Card className="max-w-full w-full">
            <CardHeader className="w-full flex-col md:flex-row  items-center justify-between">
              <h1 className="text-2xl font-bold">Contracts </h1>
              <SearchInput />
            </CardHeader>
            <CardContent className="max-w-fit ">
              <ScrollArea className="w-full  whitespace-nowrap rounded-md border">
                <div className="flex min-h-full w-max space-x-4 p-4 items-center justify-center">
                  <Card className="w-72">
                    <CardContent className="flex flex-1 items-center justify-center p-2 m-2">
                      <Link href="/contract/new">
                        <PlusIcon
                          className="h-20 w-20"
                          strokeWidth={5}
                          size={30}
                        />
                      </Link>
                    </CardContent>
                  </Card>
                  {contracts.data.$values.map((item) => (
                    <ContractCard key={item.contratId} data={item} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
          <IndividuCard />
        </CardContent>
      </Card>
    </div>
  );
}
