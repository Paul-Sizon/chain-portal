import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Providers } from '@/lib/providers';
import '@coinbase/onchainkit/styles.css';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChainPortal - Cross-Chain DeFi Platform',
  description: 'Modern DeFi platform for cross-chain portfolio management and swaps',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DynamicContextProvider
          theme='dark'
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_API || "", // Replace with your actual environment ID
            walletConnectors: [EthereumWalletConnectors],
          }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
          >
            <Header />
            <main className="min-h-screen bg-black text-white pt-16">
              <Providers>{children}</Providers>
            </main>
            <Footer />
          </ThemeProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
