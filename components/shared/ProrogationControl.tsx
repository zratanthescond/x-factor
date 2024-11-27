"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { validateProrogation } from "@/app/(root)/prorogation/actions";

export default function ProrogationControl({
  id,
  prorogationId,
}: {
  id: string;
  prorogationId: string;
}) {
  const [action, setAction] = useState("");
  useEffect(() => {
    if (action != "") {
      const data = new FormData();
      data.append("action", action);
      data.append("prorogationId", prorogationId);
      data.append("id", id);
      validateProrogation(data);
    }
  }, [action, setAction]);
  return (
    <CardFooter>
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
