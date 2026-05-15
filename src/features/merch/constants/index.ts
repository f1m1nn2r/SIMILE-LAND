import { MerchItem } from "../types";

const BRAND_DESCRIPTION = `ELIMENO(엘리메노)는 반경 1.6킬로미터 내에 활동할 수 있는 패션을 컨셉으로 두는 스트릿 패션웨어로 하이엔드보다는 베이직하고 대중적인 이미지를 추구하며 놈코어룩, 시티시크룩을 지향하는 유니섹스 컨템포러리 브랜드입니다.

DAY AFTER DAY- 베이직에 핏을 더 한 디자인, 캐주얼룩 트렌드를 앞서가되 트렌드를 쫓아가지 않으며 #심플 #노멀 #미니멀 3가지 무드에 집중하여 시그니처 핏을 더해 뚜렷한 캐주얼룩을 만들어냅니다.`;

export const merchData: MerchItem[] = [
  {
    id: "young-hee-hood",
    images: [
      "/assets/images/merch-young-hee-hood-front.png",
      "/assets/images/merch-young-hee-hood-back.png",
    ],
    title: "EL [심아일랜드] Young-Hee 후드티셔츠",
    price: "49,000원",
    originalPrice: "60,000원",
    discountRate: 18,
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "young-hee-t-shirt",
      "wwmys-hood",
      "cheol-su-t-shirt-black",
      "cheol-su-t-shirt-white",
      "cheol-su-hood",
    ],
  },
  {
    id: "wwmys-hood",
    images: [
      "/assets/images/merch-wwmys-hood-front.png",
      "/assets/images/merch-wwmys-hood-back.png",
    ],
    title: "EL [심아일랜드] We Wanna Make You Smile 후드티셔츠",
    price: "49,000원",
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "young-hee-hood",
      "cheol-su-hood",
      "young-hee-t-shirt",
      "cheol-su-t-shirt-black",
      "cheol-su-t-shirt-white",
    ],
  },
  {
    id: "cheol-su-hood",
    images: [
      "/assets/images/merch-cheol-su-hood-front.png",
      "/assets/images/merch-cheol-su-hood-back.png",
    ],
    title: "EL [심아일랜드] Cheol-Su 후드티셔츠",
    price: "49,000원",
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "wwmys-hood",
      "young-hee-hood",
      "cheol-su-t-shirt-black",
      "cheol-su-t-shirt-white",
      "young-hee-t-shirt",
    ],
  },
  {
    id: "young-hee-t-shirt",
    images: ["/assets/images/merch-young-hee-t-shirt.png"],
    title: "EL [심아일랜드] Young-Hee 반팔티셔츠",
    price: "35,000원",
    originalPrice: "51,000원",
    discountRate: 31,
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "young-hee-hood",
      "cheol-su-t-shirt-black",
      "wwmys-hood",
      "cheol-su-t-shirt-white",
      "cheol-su-hood",
    ],
  },
  {
    id: "cheol-su-t-shirt-black",
    images: [
      "/assets/images/merch-cheol-su-t-shirt-b-front.png",
      "/assets/images/merch-cheol-su-t-shirt-b-back.png",
    ],
    title: "EL [심아일랜드] Cheol-Su 반팔티셔츠",
    price: "35,000원",
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "cheol-su-hood",
      "young-hee-t-shirt",
      "wwmys-hood",
      "young-hee-hood",
      "cheol-su-t-shirt-white",
    ],
  },
  {
    id: "cheol-su-t-shirt-white",
    images: [
      "/assets/images/merch-cheol-su-t-shirt-w-front.png",
      "/assets/images/merch-cheol-su-t-shirt-w-back.png",
    ],
    title: "EL [심아일랜드] Cheol-Su 반팔티셔츠 White",
    price: "35,000원",
    description: BRAND_DESCRIPTION,
    relatedMerchIds: [
      "cheol-su-t-shirt-black",
      "cheol-su-hood",
      "young-hee-t-shirt",
      "young-hee-hood",
      "wwmys-hood",
    ],
  },
];
