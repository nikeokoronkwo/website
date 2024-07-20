import { definePage } from "#client";
import { Card, Layout, ProjectSummary, Project } from "#components";

const projects: Project[] = [{
  name: "Dyte",
}, {
  name: "Pheasant",
}, {
  name: "Quetzal",
}, {
  name: "Scud",
  inProgress: true
}];

export default definePage({
  handler: (req) => (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <section className="flex flex-col items-center justify-center min-h-screen space-y-10 w-screen">
          <div className="flex flex-col justify-between items-center space-y-10">
            <div className="text-6xl font-bold">WHAT IS <span className="text-secondary font-extrabold italic">THIS</span></div>
            <div className="text-sm">
              Scroll Down for more
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center min-h-screen space-y-10 bg-primary-950 w-screen">
          {/* Flip Card */}
          <Card />
        </section>
        <section className="flex flex-col min-h-svh space-y-10">
          {/* Project Overview */}
          <div className="text-2xl font-bold flex flex-row items-center justify-center text-center">
            Projects
          </div>
          <div className="grid grid-cols-3 gap-5 w-screen px-5">
            {projects.map((project) => ( <ProjectSummary project={project} /> ))}
          </div>
        </section>
      </div>
    </Layout>
  ),
});
