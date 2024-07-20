import { withStyles } from "#client";
import { links } from "../lib/links.jsx";

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
@import url('https://fonts.googleapis.com/css2?family=Playwrite+BR:wght@100..400&display=swap');

.major-font {
  font-family: "Beiruti", sans-serif;
}

.highlight-font {
  font-family: "Playwrite BR", cursive;
  font-optical-sizing: auto;
  font-style: normal;
}
`;

function Layout({ children }) {
  return withStyles(layoutCss)(
    <div className="flex flex-col bg-transparent h-screen">
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
    <div className="pt-5 h-16 w-[96vw] flex flex-row justify-between items-center space-x-10 mx-auto">
      <div className="highlight-font text-xl">nikechukwu</div>
      <div className="flex flex-row justify-center items-center space-x-7 mr-auto">
        {headerItems.map((h) => (
          <div className="text-center font-semibold">{h.name}</div>
        ))}
      </div>
      <div className="text-transparent">
        nikechukwu
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="flex flex-row justify-between items-center px-10 py-5">
        <small className="flex flex-col text-gray-700">
          <span>(C) Nikechukwu Okoronkwo 2024</span>
          <span>All Rights Reserved.</span>
        </small>
        <div className="flex flex-row space-x-3">
          {links.map((l) => (
              <a href={l.url} target="_blank">
                <img src={`/assets/svg/${l.id}.svg`} className="aspect-square h-10" />
              </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

