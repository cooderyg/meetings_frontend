import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import CommonHeader from "../_components/common-header";
import AiChat from "../_components/ai-chat";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <CommonHeader />
        {children}
      </main>

      <AiChat />
    </SidebarProvider>
  );
}
