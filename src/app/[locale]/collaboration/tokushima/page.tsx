import { redirect } from "next/navigation";

export default async function TokushimaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/collaboration#tokushima-university`);
}
