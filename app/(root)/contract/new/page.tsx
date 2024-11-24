"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { instance } from "@/lib/instance";
import { useMutation } from "@tanstack/react-query";
import { createContract } from "../actions";

export default function CreateContract() {
  const handleSubmit = async (data: FormData) => createContract(data);
  return (
    <div className="flex w-full flex-col items-center justify-start p-10">
      <Card className=" flex flex-col max-w-full w-full mx-10">
        <CardHeader className="w-full flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Create Contract</h1>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col p-5 m-3 gap-4">
            <label htmlFor="referenceContrat">Reference</label>
            <input
              type="text"
              name="referenceContrat"
              id="referenceContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="dateSignContrat">Date Sign</label>
            <input
              type="date"
              name="dateSignContrat"
              id="dateSignContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="montantContrat">Amount</label>
            <input
              type="number"
              name="montantContrat"
              id="montantContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="statutContrat">Status</label>
            <input
              type="text"
              name="statutContrat"
              id="statutContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="typeContrat">Type</label>
            <input
              type="text"
              name="typeContrat"
              id="typeContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="deviceContrat"> DeviceContrat</label>
            <input
              type="text"
              name="deviceContrat"
              id="deviceContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="fondGarantie">Fond Garantie</label>
            <input
              type="text"
              name="fondGarantie"
              id="fondGarantie"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="fraisCreation">Frais Creation</label>
            <input
              type="text"
              name="fraisCreation"
              id="fraisCreation"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="fraisLimite">Frais Limite</label>
            <input
              type="text"
              name="fraisLimite"
              id="fraisLimite"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="dateDebContrat"> Date Deb Contrat</label>
            <input
              type="date"
              name="dateDebContrat"
              id="dateDebContrat"
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
