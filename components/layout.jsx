import { withStyles } from "#client";

const headerItems = [{
  name: "Homepage",
  route: "/",
}, {
  name: "Projects",
  route: "/projects",
}];

const layoutStyles = {
  layout: {
    "background-image": "url(/assets/svg/bg.svg)",
    "background-attachment": "fixed",
    "background-position": "center",
  },
};

const layoutCss = `
@import url('https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&display=swap');

.major-font {
  font-family: "Beiruti", sans-serif;
}
`;

function Layout({ children }) {
  return withStyles(layoutCss)(
    <div className="flex flex-col bg-transparent h-screen">
      {
        /* <div className="fixed top-0 left-0 m-0 -z-10 w-screen">
        <img src="/assets/svg/bg.svg" className="aspect-square w-screen" />
      </div> */
      }
      <Header />
      <div>
        {/* Body */}
        {children}
      </div>
      <Footer />
    </div>,
  );
}

export default Layout;

function Header() {
  return (
    <div className="h-16 w-[96vw] flex flex-row justify-center items-center border-b-2 space-x-10 mx-auto">
      <div className="flex flex-row justify-center items-center pt-6">
        {headerItems.map((h) => (
          <div className="px-5 h-16 text-center major-font">{h.name}</div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="text-xs">(C) Nikechukwu Okoronkwo 2024</div>
    </footer>
  );
}
