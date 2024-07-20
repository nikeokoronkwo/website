import { definePage } from "#client";
import { Layout, Project, ProjectSummary } from "#components";

const projects: Project[] = [{
  name: "Dyte",
  description: "Dyte is frontend tooling designed to meet the needs of JavaScript Developers working on Deno", 
  directs: [
    {id: "github", url: "https://github.com/nikeokoronkwo/dyte"}
  ],
  route: "dyte",
  languages: ["deno", "typescript"]
}, {
  name: "Pheasant",
  description: () => <div>A modern, progressive web framework implemented in the Dart that <i>gets the job done</i></div>,
  directs: [
    {id: "github", url: "https://github.com/pheasantframework/pheasant"}
  ],
  languages: ['dart']
}, {
  name: "Quetzal",
  description: "A powerful, easy to use and complete Web Component Framework/Library that can integrate with and make use of components from other web frameworks (as well as work on its own)",
  inProgress: true,
}, {
  name: "Scud",
  inProgress: true,
}];

export default definePage({
  handler: (req) => (
    <Layout>
      <div className="items-center justify-center text-center py-8 text-3xl font-semibold">Projects</div>
      <div className="flex flex-col w-screen px-5 space-y-5">
        {projects.map((project) => <ProjectSummary project={project} />)}
      </div>
    </Layout>
  ),
});
