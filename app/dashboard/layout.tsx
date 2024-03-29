"use client";
import '@/app/ui/global.css';
import "@/app/ui/satoshi.css";
import SideNav from '@/app/ui/dashboard/sidenav';
import Sidebar from '../ui/dashboard/sidebar';
import { useEffect, useState } from 'react';
import Header from '../ui/dashboard/header/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return (
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="dark:bg-boxdark-2 dark:text-bodydark">


      {/* <div className="w-full flex-none md:w-64"> */}
      <div className="flex h-screen overflow-hidden">
        {/* <SideNav /> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* <!-- ===== Header Start ===== --> */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div 
          // className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"
          className="mx-auto p-4 md:p-6 2xl:p-10"
          >
            {children}
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      </div>
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}
    </div>
  );
}