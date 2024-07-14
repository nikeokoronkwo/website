import { definePage } from "#client";
import { Layout } from "#components";

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
      <div className="flex flex-col items-center justify-center py-5">
        <section className="flex flex-col min-h-svh space-y-10">
          <div className="text-2xl font-bold flex flex-row items-center justify-center text-center">
            Projects
          </div>
          <div className="grid grid-cols-3 gap-5">
            {projects.map((project) => (
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"></img> */}
                <div className="px-6 py-4">
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
          <div class="w-96 h-56 bg-gradient-to-br from-primary-600 to-primary-900 rounded-xl p-6 shadow-lg text-white card">
            <div class="flex justify-between items-center">
              <h1 class="text-2xl font-bold">Bank Name</h1>
              <img src="https://via.placeholder.com/50" alt="Chip" class="w-12">
              </img>
            </div>
            <div class="mt-10">
              <p class="text-lg tracking-widest font-mono">
                **** **** **** 1234
              </p>
              <div class="flex justify-between items-center mt-4">
                <p>Card Holder</p>
                <p>Expiry Date</p>
              </div>
              <div class="flex justify-between items-center mt-2">
                <p class="text-lg font-semibold">John Doe</p>
                <p class="text-lg font-semibold">12/25</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  ),
  style: `
    .card {
      background-image: url(/assets/card.svg);
    }
  `
});
