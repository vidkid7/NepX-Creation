import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Dashboard | NepX Creation",
  description: "Admin dashboard for managing NepX Creation website content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if the current path is the login page
  // We need to allow unauthenticated access to login
  
  return (
    <div className="min-h-screen bg-black">
      {session ? (
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64">
            <AdminHeader />
            <main className="p-6">{children}</main>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
