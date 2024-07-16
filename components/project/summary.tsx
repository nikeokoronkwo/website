import { withStyles, FC, Route } from "#client";

const styles = `
`

export interface Project {
  name: string;
  description?: string;
  img?: string;
  route?: string;
  inProgress?: boolean;
}

const ProjectSummary: FC<{ project: Project }> = ({ project }) => {
    return withStyles(styles)(<div className={(!project.inProgress ? "bg-primary-900 " : "bg-primary-800 ") + "max-w-lg rounded overflow-hidden shadow-lg"}>
      {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"></img> */}
      <div className="px-6 py-4">
        <div className={(project.inProgress ? "flex justify-between items-center" : "") + "font-bold text-xl mb-2"}>
          {project.inProgress ? (
            <>
              <div>{project.name}</div>
              <div className="text-sm text-secondary">in progress</div>
            </>
          ) : project.name}
        </div>
        <p className="text-gray-700 text-base py-5">
          {project.description ?? (
            <span className="text-gray-700 italic">
              No Description Available
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-row px-5 py-5 items-center justify-center">
        {!project.route ? <></> : (
          <Route to={project.route}>
            <button className="transition ease-in-out delay-150 duration-500 text-white border border-transparent hover:border-b-primary-50 hover:shadow animate-fadeIn delay-4 px-5 py-1">
              Check Out More
            </button>
          </Route>
        )}
      </div>
    </div>);
}

export default ProjectSummary;