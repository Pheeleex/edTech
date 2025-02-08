import React from "react";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <section className="">
       
     {children}
      </section>
    </div>
  );
};

export default Layout;