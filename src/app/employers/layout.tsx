import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EmployersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
