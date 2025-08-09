import { AppSidebar } from '../_components/app-sidebar';
import CommonHeader from '../_components/common-header';
import { AfterLoginProvider } from '../provider/after-login-provider';

interface Props {
   children: React.ReactNode;
}

export default function Layout({ children }: Props) {
   return (
      <AfterLoginProvider>
         <AppSidebar />

         <main className="w-full">
            <CommonHeader />
            {children}
         </main>
      </AfterLoginProvider>
   );
}
