import { ThemeProvider } from '../providers/ThemeProvider';
import { QueryProvider } from '../providers/QueryProvider';
import { ReduxProvider } from '../providers/ReduxProvider';
import { ConfirmProvider } from '../providers/ConfirmProvider';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthInitializer } from '../components/auth/AuthInitializer';
import { GlobalWarningPopup } from '../components/ui/GlobalWarningPopup';
import './globals.css';

export const metadata = {
  title: 'SIVM - Building Management System',
  description: 'Enterprise SaaS Property & Facility Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <ThemeProvider>
              <ConfirmProvider>
                <AuthInitializer>
                  <PublicLayout>
                    {children}
                    <GlobalWarningPopup />
                  </PublicLayout>
                </AuthInitializer>
              </ConfirmProvider>
            </ThemeProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
