import { definePage } from "#client";
import { Layout } from "#components";

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
    <Layout>
      <div>
        <section className="flex flex-col min-h-svh">

        </section>
      </div>
    </Layout>
  ),
});
