import { Suspense } from "#client";
import { compile } from "https://esm.sh/@mdx-js/mdx";
import remarkedGfm from "https://esm.sh/remark-gfm";

const getMdxComponent = async (file) => {
  const mdx = String(
    await compile(file, {
      remarkPlugins: [remarkedGfm],
      jsxImportSource: "nano_jsx",
    }),
  );
  return (await import(`data:text/javascript, ${mdx}`)).default;
};

const MDX = ({ children }) => {
  <div>
    {children}
  </div>;
};

const Content = ({ file }) => (
  <Suspense
    children={getMdxComponent(`/content/${file}.mdx`)}
    cache
    fallback={<div>Loading....</div>}
  >
    <MDX />
  </Suspense>
);

// class Content extends Component {
//   async didMount() {
//     const component = await getMdxComponent(`/content/${this.props.file}.mdx`);
//     this.update(component);
//   }

//   render(component) {
//     if (component) return (<div>{component}</div>);
//     else return (<div>Loading....</div>)
//   }
// }

export default Content;
