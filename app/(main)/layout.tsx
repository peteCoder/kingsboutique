
export const revalidate = 3600 // revalidate the data at most every hour

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}



