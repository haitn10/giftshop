import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "GiftShop",
    template: "",
  },
  description: "Gift shop sell all products gift items for customers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
