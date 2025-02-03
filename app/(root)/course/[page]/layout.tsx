import React from "react";

import Navbar from "@/components/Navbar";

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