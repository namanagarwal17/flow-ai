import AppFrame from "@/components/app/AppFrame";

export default function FlowAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppFrame>{children}</AppFrame>;
}
