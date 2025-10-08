import CourseNavbar from "../../(components)/CourseNavbar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode; // content of page
  params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

  return (
    <div>
      <CourseNavbar slug={slug} />
      <main>{children}</main>
    </div>
  );
}
