// TODO: Change all prop types to reflect types defined in
// `~/src/modal/types.ts`

import { cn } from "~/utils";

const TeamLayout = (props: any) => {
  const { team } = props;

  const numCols = team.members.length; // Number of columns in the table
  const tableCols = [
    // TODO
    // Object.keys(), // Team type 
    ...team.members,
  ];

  return (
    <div
      className="flex flex-col divide-y
        rounded-lg shadow-lg overflow-hidden 
        [&_span]:px-4 [&_span]:py-2 [&_span]:-mx-[2px]"
    >
      {/* Table header */}
      <span className="bg-rose-100">Test</span>

      <div className="flex gap-[2px] divide-x">
        {team.members.map((member: any, index: number) => (
          <div className="flex flex-col divide-y">
            <span
              className={
                member.role === "project lead" ||
                member.role === "secondary lead"
                  ? "bg-yellow-300"
                  : "bg-blue-300"
              }
            >
              {member.role}
            </span>
            <span>{member.name}</span>
            <span>{member.discord}</span>
            <span>{member.totalProficiency}</span>
            <span>{member.availability}</span>
            <span>{member.github}</span>
            <span>{member.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DepartmentLayout = (props: any) => {
  const { department } = props;
  return (
    <div className="flex flex-col gap-8">
      {department.teams.map((team: any) => (
        <TeamLayout team={team} />
      ))}
    </div>
  );
};

const OperationsSectorLayout = (props: any) => {
  return <table></table>;
};

export { TeamLayout, DepartmentLayout, OperationsSectorLayout };
