import { definePage } from "#client";
import { Project, ProjectSummary } from "~/components/index.tsx";

const projects: Project[] = [{
  name: "Dyte",
}, {
  name: "Pheasant",
}, {
  name: "Quetzal",
}, {
  name: "Scud",
  inProgress: true,
}];

export default definePage({
  handler: (req) => (
    <div>
      <div className="grid grid-cols-3 gap-5 w-screen px-5">
        {projects.map((project) => <ProjectSummary project={project} />)}
      </div>
    </div>
  ),
});
