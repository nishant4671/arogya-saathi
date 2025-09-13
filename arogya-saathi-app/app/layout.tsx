// Import necessary types from Next.js for metadata
import type { Metadata } from "next";
// Import the Inter font from Google Fonts
import { Inter } from "next/font/google";
// Import global CSS styles
import "./globals.css";
// Import our custom component to prevent hydration errors
import NoSsr from "./NoSsr";
// Import the AuthProvider
import { AuthProvider } from "./context/AuthContext";
// Import the SimpleChatBot component
import SimpleChatBot from "./components/SimpleChatBot";

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application (shown in browser tab and SEO)
export const metadata: Metadata = {
  title: "Arogya Saathi", // App name shown in browser tab
  description: "Comprehensive Digital Health Ecosystem", // App description for SEO
};

// Root layout component that wraps all pages
export default function RootLayout({
  children, // Page content that will be rendered
}: {
  children: React.ReactNode; // Type definition for children
}) {
  return (
    // HTML document with English language setting and suppressed hydration warning
    <html lang="en" suppressHydrationWarning>
      {/* Body with Inter font applied and our NoSsr wrapper */}
      <body className={inter.className}>
        <NoSsr>
          {/* Wrap children with AuthProvider for authentication state */}
          <AuthProvider>
            {children}
            {/* Add chatbot to all pages */}
            <SimpleChatBot />
          </AuthProvider>
        </NoSsr>
      </body>
    </html>
  );
}
