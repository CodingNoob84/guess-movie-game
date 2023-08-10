import NavBar from "@/components/layouts/NavBar";

export default function AdminLayout({ children }) {
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col">
        <NavBar />
        {children}
        <div className="h-[50px]">Footer</div>
      </div>
    </main>
  );
}
