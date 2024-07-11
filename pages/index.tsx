import { definePage, h } from "#client";

export default definePage({
  handler: (req) => (
    <div className="flex bg-slate-900 text-white">
      <div className="fixed top-0 left-0 h-16 w-screen flex flex-row bg-slate-700 shadow-lg">
        <i>Homepage</i>
        <i>Projects</i>
      </div>
    </div>
  ), 
});
