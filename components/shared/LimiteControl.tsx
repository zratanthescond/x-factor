"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

import { validateLimite } from "@/app/(root)/contract/actions";

export default function LimietionControl({
  id,
  limiteId,
}: {
  id: string;
  limiteId: string;
}) {
  const [action, setAction] = useState("");
  useEffect(() => {
    if (action != "") {
      const data = new FormData();
      data.append("action", action);
      data.append("limiteId", limiteId);
      data.append("id", id);
      validateLimite(data);
    }
  }, [action, setAction]);
  return (
    <CardFooter className="flex flex-row justify-between flex-1">
      <Button
        name="action"
        type="submit"
        value="accept"
        variant="default"
        className="bg-green-500"
        size={"sm"}
        onClick={() => setAction("accept")}
      >
        Accepter
      </Button>

      <Button
        name="action"
        type="submit"
        value="refuse"
        variant="destructive"
        size={"sm"}
        onClick={() => setAction("refuse")}
      >
        Refusé
      </Button>
    </CardFooter>
  );
}
