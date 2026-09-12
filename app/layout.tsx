import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { FloatingButtons } from '@/components/floating-buttons';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Gilgit Getaways Trek and Tours',
  description: 'Epic Journeys, Led by Local Experts',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} font-sans antialiased text-gray-800 dark:text-gray-200 dark:bg-gray-950 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            {children}
            <FloatingButtons />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
