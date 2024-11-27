"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

import { validateFinancement } from "@/app/(root)/contract/actions";

export default function FinanacementControl({
  id,
  financementId,
}: {
  id: string;
  financementId: string;
}) {
  const [action, setAction] = useState("");
  useEffect(() => {
    if (action != "") {
      const data = new FormData();
      data.append("action", action);
      data.append("financementId", financementId);
      data.append("id", id);
      validateFinancement(data);
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
