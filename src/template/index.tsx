"use client"

import type * as React from "react"

import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-full min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex w-full flex-1 flex-col">
          <Header />
          <main className="flex flex-1 flex-col items-center justify-center overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

const Header = () => {
  return (
    <header className="flex h-[72px] items-center border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="ml-4">Header</div>
    </header>
  )
}

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="aspect-square w-16 rounded-full bg-muted" />
          <h1 className="mt-2 text-sm font-medium">Sidebar</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>{/* Add your sidebar content here */}</SidebarContent>
    </Sidebar>
  )
}

const withLayout = (Component: React.ComponentType) => {
  const WrappedComponent: React.FC = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  WrappedComponent.displayName = `withLayout(${Component.displayName ?? (Component.name || "Component")})`

  return WrappedComponent
}

export { Layout, withLayout }

