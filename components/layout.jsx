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
    "background-position": "center"
  },
};

function Layout({ children }) {
  return (
    <div
      className="flex flex-col bg-transparent text-white h-screen"
    >
      <div className="fixed top-0 left-0 m-0 -z-10 w-screen">
        <img src="/assets/svg/bg.svg" className="aspect-square w-screen" />
      </div>
      <Header />
      <div>
        {/* Body */}
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

function Header() {
  return (
    <div className=" h-16 w-screen flex flex-row justify-center items-center shadow-lg space-x-10">
      <div className="flex flex-row justify-center items-center pt-6">
        {headerItems.map((h) => (
          <div className="px-5 h-16 text-center italic">{h.name}</div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div>(C)</div>
    </footer>
  );
}
