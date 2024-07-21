import { definePage } from "#client";
import { Layout } from "#components";

export default definePage({
  handler: (_req) => (
    <Layout>
      <div className="flex items-center justify-center">
        Sorry, this page is unavailable at the moment. Check the links on the
        subheadings for more information
      </div>
    </Layout>
  ),
});
