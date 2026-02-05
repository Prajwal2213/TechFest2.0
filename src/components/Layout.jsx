const Layout = ({ children }) => {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
