import { definePage } from "#client";

const headerItems: {
  name: string;
  route: string;
}[] = [{
  name: "Homepage",
  route: "/"
}, {
  name: "Projects",
  route: "/projects"
}]

export default definePage({
  handler: (req) => (
    <div className="flex flex-col bg-primary-900 text-white body">
      {/* Header */}
      <div className=" h-16 w-screen flex flex-row justify-center items-center bg-slate-700 shadow-lg space-x-10">
        <div className="flex flex-row justify-center items-center pt-6">
          {headerItems.map(h => <div className="px-5 h-16 text-center">{h.name}</div>)}
        </div>
      </div>
      {/* Body */}
      <div>
        <section>
          <div></div>
        </section>
      </div>
    </div>
  ),
  style: `
    .body {
      height: 100vh;
    }
  `
});
