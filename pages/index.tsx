import { definePage } from "#client";
import { Card, Layout } from "#components";

const projects: {
  name: string;
  description?: string;
  img?: string;
  route?: string;
}[] = [{
  name: "Dyte",
}, {
  name: "Pheasant",
}, {
  name: "Quetzal",
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
          <div className="grid grid-cols-3 gap-5">
            {projects.map((project) => (
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-primary-900">
                {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"></img> */}
                <div className="px-6 py-4 bg-primary-900">
                  <div className="font-bold text-xl mb-2">{project.name}</div>
                  <p className="text-gray-700 text-base">
                    {project.description ?? (
                      <span className="text-gray-700 italic">
                        No Description Available
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  ),
});
