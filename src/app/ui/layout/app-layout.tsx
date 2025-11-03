import { requireSession } from '@/app/lib/auth';
import SideNav from '@/app/ui/layout/sidenav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireSession();

  return (
    <main className="flex flex-col gap-4 p-4 h-screen">
      <div className="flex flex-1 flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-80">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}

