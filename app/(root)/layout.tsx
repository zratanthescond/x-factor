import AuthContext from "@/components/contexts/AuthContext";
import ReactQueryProvider from "@/components/contexts/ReactQueryProvider";
import Header from "@/components/shared/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <ReactQueryProvider>
        <div className="flex w-full h-screen flex-col">
          <Header />
          <main className="flex-1 flex mt-20">{children}</main>
        </div>
      </ReactQueryProvider>
    </AuthContext>
  );
}
