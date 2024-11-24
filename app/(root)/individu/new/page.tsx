"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { createIndividuAction } from "../actions";

export default function CreateIndividu() {
  const handleSubmit = async (data: FormData) => createIndividuAction(data);
  return (
    <div className="flex w-full flex-col items-center justify-start p-10">
      <Card className=" flex flex-col max-w-full w-full mx-10">
        <CardHeader className="w-full flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Create Individu</h1>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col p-5 m-3 gap-4">
            <label htmlFor="nomIndividu">Nom</label>
            <input
              type="text"
              name="nom"
              id="nomIndividu"
              className="border border-gray-300 rounded-md p-2"
            />
            <label htmlFor="prenomIndividu">Prenom</label>
            <input
              type="text"
              name="prenom"
              id="prenomIndividu"
              className="border border-gray-300 rounded-md p-2"
            />
            <label htmlFor="emailIndividu">Email</label>
            <input
              type="email"
              name="email"
              id="emailIndividu"
              className="border border-gray-300 rounded-md p-2"
            />
            <label htmlFor="phoneIndividu">Phone</label>
            <input
              type="text"
              name="numberPhone"
              id="phoneIndividu"
              className="border border-gray-300 rounded-md p-2"
            />
            <label htmlFor="passwordIndividu">Password</label>
            <input
              type="password"
              name="password"
              id="passwordIndividu"
              className="border border-gray-300 rounded-md p-2"
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
