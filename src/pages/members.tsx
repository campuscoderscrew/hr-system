import React, { useState } from "react";

import NavBar from "~/components/navbar";
import {
  DepartmentLayout,
  OperationsSectorLayout,
} from "../components/SpreadsheetLayout";
import type {
  Department,
  Membership,
  OperationsSector,
  Team,
} from "../../utils/model/types";
import { members as initialMembers } from "../../utils/model/data";
import { currentPositions } from "../../utils/model/types";

import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { removeMemberDeep } from "../../utils/model/operations";

const formatMonth = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function describeTenure(member: Membership): string {
  const history = member.positionHistory;
  if (history.length === 0) return "";

  const first = new Date(Math.min(...history.map((p) => p.startDate.getTime())));
  const stillActive = history.some((p) => !p.endDate);
  const last = stillActive
    ? null
    : new Date(Math.max(...history.map((p) => p.endDate!.getTime())));

  return `${formatMonth(first)} to ${last ? formatMonth(last) : "present"}`;
}

export default function Members() {
  const [appMembers, setAppMembers] = useState<Membership[]>(initialMembers);

  const [pendingDelete, setPendingDelete] = useState<Membership | null>(null);
  const [deleteSummary, setDeleteSummary] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    
    const next = [...appMembers];
    const { removed, clearedReferences, affectedMembers } = removeMemberDeep(
      next,
      pendingDelete.emails[0],
    );

    setAppMembers(next);
    setPendingDelete(null);

    if (removed) {
      setDeleteSummary(
        clearedReferences === 0
          ? `Deleted ${removed.name}. No other members referenced them as a supervisor.`
          : `Deleted ${removed.name}. Cleared ${plural(clearedReferences, "supervisor reference")} across ${plural(affectedMembers, "member")}.`,
      );
    }
  };

  const team: Team = {
    name: "Team Lemon",
    kind: "development",
    availabilityRule: { comparator: ">=", hours: 6 },
    proficiency: { kind: "average", value: 9 },
    maxDevelopers: 4,
    techStack: ["React", "TypeScript", "FastAPI"],
    website: "teamlemon.com",
    members: appMembers,
    teamLead: appMembers.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const nonDevTeam: Team = {
    name: "Team NonDev",
    kind: "non-development",
    members: appMembers,
    teamLead: appMembers.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const department = {
    name: "Development Department",
    abbreviation: "Dev",
    members: appMembers,
    teams: [team, nonDevTeam, team],
  } as Department;

  const sector = {
    name: "Development Operations",
    departments: [department, department],
    leadership: appMembers,
  } as OperationsSector;

  const handleMoveTeamAPI = async (
    email: string, 
    oldRole: string, 
    newRole: string, 
    supervisor?: [string, string]
  ) => {
    try {
      const response = await fetch(`/members/${email}/move-team`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldRole, newRole, supervisor })
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
    <div className="">
      <NavBar />

      {deleteSummary && (
        <div
          role="status"
          className="mx-auto mt-4 flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm text-slate-800"
        >
          <span>{deleteSummary}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDeleteSummary(null)}
            className="rounded p-1 text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="h-screen grid place-items-center ">
        <OperationsSectorLayout
          sector={sector}
          members={appMembers}
          setMembers={setAppMembers}
          handleMoveTeamAPI={handleMoveTeamAPI}
          onRequestDelete={setPendingDelete}
        />
      </div>

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        title="Delete this member?"
        description={
          pendingDelete && (
            <>
              <p>
                <strong>{pendingDelete.name}</strong> ({pendingDelete.emails.join(", ")})
              </p>
              <p className="mt-2">
                This permanently removes {pendingDelete.positionHistory.length}{" "}
                position{pendingDelete.positionHistory.length === 1 ? "" : "s"}
                {describeTenure(pendingDelete) && ` spanning ${describeTenure(pendingDelete)}`}
                . This cannot be undone.
              </p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}