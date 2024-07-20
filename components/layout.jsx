import { withStyles } from "#client";
import { links } from "../lib/links.jsx";
import IconList from "~/components/iconList.tsx";

const headerItems = [{
  name: "Homepage",
  route: "/",
}, {
  name: "Projects",
  route: "/projects",
}, {
  name: "Blog",
  route: "/blog"
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

@keyframes underline {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.underliner {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.underliner::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px; /* Adjust the thickness of the underline */
  background-color: black; /* Use the text color */
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.3s ease;
}

.underliner:hover::after {
  transform: translate3d(0, 0, 0);
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
          <a href={h.route} className="underliner">
            <div className="text-center font-semibold">{h.name}</div>
          </a>
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
          <IconList list={links} />
        </div>
      </div>
    </footer>
  );
}

