import { FC, Route } from "#client";
import IconList, { RedirectObject } from "../iconList.tsx";

export interface Project {
  name: string;
  // deno-lint-ignore no-explicit-any
  description?: string | (() => any);
  img?: string;
  route?: string;
  inProgress?: boolean;
  directs?: RedirectObject[];
  languages?: string[];
}

const ProjectSummary: FC<{ project: Project }> = ({ project }) => {
  return (
    <div
      className={(!project.inProgress ? " " : "bg-primary-50 ") +
        "w-[70vw] border border-primary-900 rounded overflow-hidden shadow-sm flex flex-row justify-between py-2"}
    >
      <div>
        <div className="px-6 py-2">
          <div
            className={(project.inProgress
              ? "flex justify-between items-center"
              : "") + "font-bold text-xl mb-2"}
          >
            {project.inProgress
              ? (
                <>
                  <div>{project.name}</div>
                  <div className="self-end text-sm text-primary-950 italic mt-auto pb-1">
                    in progress
                  </div>
                </>
              )
              : project.name}
          </div>
          <p className="text-gray-700 text-base py-5">
            {project.description
              ? (typeof project.description === "string"
                ? project.description
                : <project.description />)
              : (
                <span className="text-gray-700 italic">
                  No Description Available
                </span>
              )}
          </p>
        </div>
        <div className="flex flex-row px-5 py-5 items-center justify-between self-start">
          {project.directs
            ? (
              <div className="self-end flex flex-row px-2 py-2 space-x-2">
                <IconList list={project.directs} iconSize="h-7" />
              </div>
            )
            : <></>}
          {!project.route ? <></> : (
            <Route to={`/projects/${project.route}`}>
              <button className="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1">
                Check Out More
              </button>
            </Route>
          )}
        </div>
      </div>
      {project.languages
        ? (
          <div className="flex flex-col px-3 py-3 space-y-3 justify-end border border-transparent border-l-1 border-l-primary-950 items-center">
            {project.languages.map((l) => (
              <img src={`/assets/svg/${l}.svg`} className="aspect-square h-7" alt={l} />
            ))}
          </div>
        )
        : <></>}
    </div>
  );
};

export default ProjectSummary;
