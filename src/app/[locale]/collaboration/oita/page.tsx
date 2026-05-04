import { redirect } from "next/navigation";

export default async function OitaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/collaboration#oita-university`);
}
