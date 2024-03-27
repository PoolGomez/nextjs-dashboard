"use client";
import '@/app/ui/global.css';
import "@/app/ui/satoshi.css";
import SideNav from '@/app/ui/dashboard/sidenav';
import Sidebar from '../ui/dashboard/sidebar';
import { useEffect, useState } from 'react';
 
export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* <SideNav /> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}