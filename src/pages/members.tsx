import React, { createContext, useMemo, useState } from "react";

import NavBar from "@src/components/navbar";
import { OperationsSectorLayout } from "../components/SpreadsheetLayout";
import type { Membership } from "../../utils/model/types";
import { members as initialMembers } from "../../utils/model/data";
import { buildOrganization } from "@utils/model/organization";

export default function Members() {
  const [appMembers, setAppMembers] = useState<Membership[]>(
    Array.from(initialMembers),
  );
  const orgTree = useMemo(() => buildOrganization(appMembers), [appMembers]);

  const handleMoveTeamAPI = async (
    email: string,
    oldRole: string,
    newRole: string,
    supervisor?: [string, string],
  ) => {
    try {
      const response = await fetch(`/members/${email}/move-team`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldRole, newRole, supervisor }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Database updated successfully");
    } catch (error) {
      console.error("Failed to update member in the database", error);
      alert("Failed to save transfer to the database.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="h-screen grid place-items-center ">
        {orgTree.map((sector, i) => {
          console.log(sector.name);
          return (
            <OperationsSectorLayout
              key={`sector-${sector}-${i}`}
              sector={sector}
              members={appMembers}
              // Uses prop drilling for convenience and readability
              // OperationsSectorsLayouts down to TeamsLayouts will have this prop
              onMembersChange={setAppMembers}
              handleMoveTeamAPI={handleMoveTeamAPI}
            />
          );
        })}
      </div>
    </div>
  );
}
