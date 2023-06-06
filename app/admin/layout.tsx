"use client";
import "node_modules/react-modal-video/css/modal-video.css";
import "@/styles/index.css";
import { AdminProviders } from "./AdminProviders";
import TopBar from "@/components/Admin/TopBar";
import Sidebar from "@/components/Admin/Sidebar";
import { use, useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head />
      <body className="relative flex min-h-screen flex-col ">
        <AdminProviders session={undefined}>
          <TopBar />
          <div className="flex space-x-1 ">
            <Sidebar />
            {children}
          </div>
        </AdminProviders>
      </body>
    </>
  );
}
