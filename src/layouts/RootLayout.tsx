import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function Component() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main><Outlet /></Main>
      <Footer />
    </div>
      <ScrollRestoration
        getKey={(location) => {
          return location.key;
        }}
      />
    </>
  );
}

export function ErrorBoundary() {
  return <div>errror</div>;
}
