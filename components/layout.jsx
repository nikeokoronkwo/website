const headerItems = [{
    name: "Homepage",
    route: "/"
  }, {
    name: "Projects",
    route: "/projects"
}]

function Layout({ children }) {
    return (
        <div className="flex flex-col bg-primary-950 text-white h-screen">
            <Header />
            <div>
                {/* Body */}
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout;

function Header() {
  return (
  <div className=" h-16 w-screen flex flex-row justify-center items-center bg-primary-800 shadow-lg space-x-10">
    <div className="flex flex-row justify-center items-center pt-6">
      {headerItems.map(h => <div className="px-5 h-16 text-center">{h.name}</div>)}
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