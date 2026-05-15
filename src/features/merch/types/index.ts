export type MerchItem = {
  id: string;
  images: string[];
  title: string;
  price: string;
  originalPrice?: string;
  discountRate?: number;
  description: string;
  relatedMerchIds: string[];
};

export type MerchDetailProps = {
  merch: MerchItem;
  relatedMerchs: MerchItem[];
};
