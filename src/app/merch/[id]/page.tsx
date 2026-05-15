import MerchDetail from "./merch-detail";
import { notFound } from "next/navigation";
import { merchData } from "@/src/features/merch/constants";

type MerchDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MerchDetailPage({
  params,
}: MerchDetailPageProps) {
  const { id } = await params;

  const merch = merchData.find((item) => item.id === id);
  if (!merch) notFound();

  const relatedMerchs = merch.relatedMerchIds
    .map((relId) => merchData.find((item) => item.id === relId))
    .filter((item): item is (typeof merchData)[number] => item !== undefined);

  return <MerchDetail merch={merch} relatedMerchs={relatedMerchs} />;
}
