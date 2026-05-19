// src/app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "../components/providers";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigitalSoft ERP Cloud",
  description: "Modern Multi-Tenant Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            {children}
            <Toaster 
            position="top-right" 
            theme="dark"
            richColors
            toastOptions={{
              style: {
                background: '#0d0d18', // Matches your card background
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                color: '#fff',
              },
            }}
          />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}