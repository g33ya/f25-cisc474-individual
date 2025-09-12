import CourseNavbar from "../../(components)/CourseNavbar";

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode; // content of page
  params: { slug: string };
}) {
  return (
    <div>
      <CourseNavbar slug={params.slug} />
      <main>{children}</main>
    </div>
  );
}
