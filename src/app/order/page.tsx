"use client";

import Image from "next/image";
import style from "./order.module.scss";
import { use, useState } from "react";
import { redirect } from "next/navigation";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { merchData } from "@/src/features/merch/constants";

const MOCK_ORDERER = {
  name: "주문자",
  phone: "010-1234-5678",
  email: "test@gmail.com",
};

const MOCK_SHIPPING = {
  name: "주문자",
  phone: "010-1234-5678",
  zipCode: "12345",
  address: "경기 성남시 분당구 판교역로 235, 10층",
};

const PAYMENT_METHODS = [
  "카카오페이",
  "네이버페이",
  "토스페이",
  "신용/체크카드",
  "무통장 입금",
];

const DELIVERY_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 50000;

function parsePrice(price: string) {
  return parseInt(price.replace(/[^0-9]/g, ""), 10);
}

function formatPrice(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

export default function Order({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { productId } = use(searchParams);
  const product = merchData.find((item) => item.id === productId);

  if (!product) redirect("/merch");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const productPrice = parsePrice(product.price);
  const deliveryFee =
    productPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;
  const totalPrice = productPrice + deliveryFee;

  return (
    <div className={style["order"]}>
      <Typography
        as="h1"
        size="heading-2"
        weight="semibold"
        className={style["order__title"]}
      >
        ORDER
      </Typography>

      <div className={style["order__layout"]}>
        {/* 좌측 컨텐츠 */}
        <div className={style["order__left"]}>
          {/* 주문 상품 정보 */}
          <section className={style["order__section"]}>
            <Typography
              as="h2"
              size="body"
              weight="semibold"
              className={style["order__section-title"]}
            >
              주문 상품 정보
            </Typography>
            <div className={style["order__product"]}>
              <div className={style["order__product-img-wrap"]}>
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className={style["order__product-img"]}
                />
              </div>
              <div className={style["order__product-info"]}>
                <Typography size="body" weight="medium">
                  {product.title}
                </Typography>
                <div className={style["order__product-price-wrap"]}>
                  {product.originalPrice && product.discountRate && (
                    <Typography
                      size="caption"
                      className={style["order__product-original-price"]}
                    >
                      {product.originalPrice}
                    </Typography>
                  )}
                  <Typography
                    size="body"
                    weight="semibold"
                    className={style["order__product-price"]}
                  >
                    {product.discountRate && (
                      <span className={style["order__product-discount"]}>
                        {product.discountRate}%{" "}
                      </span>
                    )}
                    {product.price}
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          <hr className={style["order__divider"]} />

          {/* 주문자 정보 */}
          <section className={style["order__section"]}>
            <Typography
              as="h2"
              size="body"
              weight="semibold"
              className={style["order__section-title"]}
            >
              주문자 정보
            </Typography>
            <dl className={style["order__info-table"]}>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  주문하시는 분
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  {MOCK_ORDERER.name}
                </Typography>
              </div>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  연락처
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  {MOCK_ORDERER.phone}
                </Typography>
              </div>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  이메일
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  {MOCK_ORDERER.email}
                </Typography>
              </div>
            </dl>
          </section>

          <hr className={style["order__divider"]} />

          {/* 배송지 정보 */}
          <section className={style["order__section"]}>
            <div className={style["order__section-header"]}>
              <Typography
                as="h2"
                size="body"
                weight="semibold"
                className={style["order__section-title"]}
              >
                배송지 정보
              </Typography>
              <button
                type="button"
                className={style["order__address-badge"]}
                onClick={() => setIsModalOpen(true)}
              >
                <Typography size="caption" weight="semibold">
                  주소 변경
                </Typography>
              </button>
            </div>
            <dl className={style["order__info-table"]}>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  받으시는 분
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  {MOCK_SHIPPING.name}
                </Typography>
              </div>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  연락처
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  {MOCK_SHIPPING.phone}
                </Typography>
              </div>
              <div className={style["order__info-row"]}>
                <Typography
                  as="dt"
                  size="body"
                  className={style["order__info-label"]}
                >
                  주소
                </Typography>
                <Typography
                  as="dd"
                  size="body"
                  className={style["order__info-value"]}
                >
                  ({MOCK_SHIPPING.zipCode}) {MOCK_SHIPPING.address}
                </Typography>
              </div>
            </dl>
          </section>

          <hr className={style["order__divider"]} />

          {/* 결제수단 */}
          <section className={style["order__section"]}>
            <Typography
              as="h2"
              size="body"
              weight="semibold"
              className={style["order__section-title"]}
            >
              결제수단
            </Typography>
            <div className={style["order__payment-grid"]}>
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`${style["order__payment-btn"]} ${selectedPayment === method ? style["order__payment-btn--active"] : ""}`}
                  onClick={() => setSelectedPayment(method)}
                >
                  <Typography size="body">{method}</Typography>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* 우측 TOTALS */}
        <aside className={style["order__right"]}>
          <div className={style["order__totals"]}>
            <Typography
              as="h2"
              size="subtitle"
              weight="semibold"
              className={style["order__totals-title"]}
            >
              TOTALS
            </Typography>
            <div className={style["order__totals-rows"]}>
              <div className={style["order__totals-row"]}>
                <Typography
                  size="body"
                  className={style["order__totals-label"]}
                >
                  주문 상품 금액
                </Typography>
                <Typography size="body">{formatPrice(productPrice)}</Typography>
              </div>
              <div className={style["order__totals-row"]}>
                <Typography
                  size="body"
                  className={style["order__totals-label"]}
                >
                  배송비
                </Typography>
                <Typography size="body">
                  {deliveryFee === 0
                    ? formatPrice(0)
                    : `+${formatPrice(deliveryFee)}`}
                </Typography>
              </div>
              <div
                className={`${style["order__totals-row"]} ${style["order__totals-row--final"]}`}
              >
                <Typography
                  size="body"
                  weight="bold"
                  className={style["order__totals-label"]}
                >
                  최종 결제 금액
                </Typography>
                <Typography size="body" weight="bold">
                  {formatPrice(totalPrice)}
                </Typography>
              </div>
            </div>
            <Typography size="caption" className={style["order__totals-note"]}>
              * 50,000원 이상 구매 시 무료 배송, 미만일 경우 3,000원이
              추가됩니다.
            </Typography>

            <div className={style["order__actions"]}>
              <Button
                variant="default"
                bgColor="graylighter"
                textSize="body"
                textWeight="semibold"
                className={style["order__btn-prev"]}
              >
                이전
              </Button>
              <Button
                variant="default"
                bgColor="teal"
                textSize="body"
                textWeight="semibold"
                className={style["order__btn-pay"]}
              >
                결제하기
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* 배송지 목록 모달 */}
      {isModalOpen && (
        <div
          className={style["modal-overlay"]}
          onClick={() => setIsModalOpen(false)}
          role="presentation"
        >
          <div
            className={style["modal"]}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={style["modal__header"]}>
              <Typography
                as="h3"
                id="modal-title"
                size="subtitle"
                weight="semibold"
                className={style["modal__title"]}
              >
                배송지 목록
              </Typography>
              <button
                type="button"
                className={style["modal__close"]}
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
              >
                <Image
                  src="/assets/icons/close.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <Button
              variant="default"
              bgColor="graylighter"
              textSize="caption"
              textWeight="semibold"
              className={style["modal__add-btn"]}
            >
              새 배송지 추가
            </Button>

            <div className={style["modal__empty"]}>
              <Image
                src="/assets/icons/no.svg"
                alt=""
                aria-label="없음"
                width={32}
                height={32}
                className={style["modal__empty-icon"]}
              />
              <Typography
                size="body"
                weight="medium"
                className={style["modal__empty-text"]}
              >
                등록된 배송지가 없어요.
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
