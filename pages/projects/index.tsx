import { definePage } from "#client";
import { Layout, ProjectSummary } from "#components";
import { projects } from "../../lib/projects.tsx";

export default definePage({
  handler: (_req) => (
    <Layout>
      <div className="items-center justify-center text-center py-8 text-3xl font-semibold">
        Projects
      </div>
      <div className="flex flex-col w-screen px-5 space-y-5 items-center">
        {projects.map((project) => <ProjectSummary project={project} />)}
      </div>
    </Layout>
  ),
});
