const headerItems = [{
  name: "Homepage",
  route: "/",
}, {
  name: "Projects",
  route: "/projects",
}];

const layoutStyles = {
  layout: {
    "background-image": "url(/assets/bg.svg)",
    "background-attachment": "fixed",
    "background-size": "cover",
    "background-repeat": "no-repeat"
  }
}

function Layout({ children }) {
  return (
    <div className="flex flex-col bg-primary-950 text-white h-screen" style={{ ...layoutStyles.layout }}>
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
    <div className=" h-16 w-screen flex flex-row justify-center items-center bg-primary-900 shadow-lg space-x-10">
      <div className="flex flex-row justify-center items-center pt-6">
        {headerItems.map((h) => (
          <div className="px-5 h-16 text-center">{h.name}</div>
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
