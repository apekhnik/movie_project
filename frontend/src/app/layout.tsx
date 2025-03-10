import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Sidebar} from "@/components/layout/SideBar";
import {Header} from "@/components/layout/Header";
import {LoadingWrapper} from "@/components/layout/LoadingWrapper";
import {ToastContainer} from "react-toastify";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex min-h-screen`}
      >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
          <AuthProvider>
              <LoadingWrapper>{children}</LoadingWrapper>
          </AuthProvider>
          <ToastContainer
              position="bottom-right" // Внизу справа
              autoClose={3000} // Закрывается через 3 секунды
              hideProgressBar={false} // Показываем прогресс-бар
              newestOnTop={false} // Новые сообщения снизу
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </div>
      </body>
    </html>
  );
}
