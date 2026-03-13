import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MNUMS Graduate School",
  description:
    "Mongolian National University of Medical Sciences - Graduate School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
