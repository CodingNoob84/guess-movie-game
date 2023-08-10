export default function UserLayout({ children }) {
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col">
        <div className="h-[50px]">Nav Bar</div>
        {children}
        <div className="h-[50px]">Footer</div>
      </div>
    </main>
  );
}
