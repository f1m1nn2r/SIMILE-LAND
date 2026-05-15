"use client";

import style from "./merch-detail.module.scss";
import "swiper/css";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { SectionTitle } from "@/src/components/common/section-title";
import { MerchCard } from "@/src/features/merch";
import { MerchDetailProps } from "@/src/features/merch/types";

export default function MerchDetail({
  merch,
  relatedMerchs,
}: MerchDetailProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={style["merch-detail"]}>
      <div className={style["merch-detail__main"]}>
        {/* 이미지 슬라이더 */}
        <div className={style["merch-detail__gallery"]}>
          <div className={style["merch-detail__slider-wrap"]}>
            <button
              type="button"
              className={`${style["merch-detail__nav"]} ${style["merch-detail__nav--prev"]}`}
              onClick={() => mainSwiper?.slidePrev()}
              aria-label="이전"
            >
              <Image
                src="/assets/icons/prev.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>

            <Swiper
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              onSwiper={setMainSwiper}
              className={style["merch-detail__swiper"]}
            >
              {merch.images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className={style["merch-detail__slide"]}>
                    <Image
                      src={src}
                      alt={`${merch.title} ${i + 1}`}
                      width={713}
                      height={713}
                      className={style["merch-detail__slide-img"]}
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={`${style["merch-detail__nav"]} ${style["merch-detail__nav--next"]}`}
              onClick={() => mainSwiper?.slideNext()}
              aria-label="다음"
            >
              <Image
                src="/assets/icons/next.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>
          </div>

          {/* 썸네일 */}
          {merch.images.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView="auto"
              spaceBetween={12}
              watchSlidesProgress
              className={style["merch-detail__thumbs"]}
            >
              {merch.images.map((src, i) => (
                <SwiperSlide
                  key={i}
                  className={style["merch-detail__thumb-slide"]}
                >
                  <div className={style["merch-detail__thumb"]}>
                    <Image
                      src={src}
                      alt={`${merch.title} 썸네일 ${i + 1}`}
                      width={200}
                      height={200}
                      className={style["merch-detail__thumb-img"]}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* 상품 정보 */}
        <div className={style["merch-detail__info"]}>
          <Typography
            as="h1"
            size="heading-5"
            weight="medium"
            className={style["merch-detail__title"]}
          >
            {merch.title}
          </Typography>

          <div className={style["merch-detail__price-wrap"]}>
            {merch.originalPrice && merch.discountRate && (
              <Typography
                size="body"
                className={style["merch-detail__original-price"]}
              >
                {merch.originalPrice}
              </Typography>
            )}
            <Typography
              size="body"
              weight="bold"
              className={style["merch-detail__price"]}
            >
              {merch.discountRate && (
                <span className={style["merch-detail__discount-rate"]}>
                  {merch.discountRate}%{" "}
                </span>
              )}
              {merch.price}
            </Typography>
          </div>

          <Typography
            size="body"
            className={style["merch-detail__description"]}
          >
            {merch.description}
          </Typography>

          <hr className={style["merch-detail__divider"]} />

          {/* 수량 선택 */}
          <div className={style["merch-detail__quantity"]}>
            <button
              type="button"
              className={style["merch-detail__quantity-btn"]}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="상품 수량 줄이기"
            >
              <Image
                src="/assets/icons/minus.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1) setQuantity(val);
              }}
              onBlur={(e) => {
                if (!e.target.value || parseInt(e.target.value, 10) < 1) {
                  setQuantity(1);
                }
              }}
              className={style["merch-detail__quantity-input"]}
              aria-label="수량"
            />
            <button
              type="button"
              className={style["merch-detail__quantity-btn"]}
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="상품 수량 늘리기"
            >
              <Image
                src="/assets/icons/plus.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>

          {/* 버튼 */}
          <div className={style["merch-detail__actions"]}>
            <Button
              variant="default"
              bgColor="graylighter"
              textSize="body"
              textWeight="semibold"
              className={style["merch-detail__btn-cart"]}
            >
              장바구니에 담기
            </Button>
            <Button
              variant="default"
              bgColor="teal"
              textSize="body"
              textWeight="semibold"
              className={style["merch-detail__btn-buy"]}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>

      {/* You may also like - 좋아할만한 상품 */}
      {relatedMerchs.length > 0 && (
        <section className={style["merch-detail__related"]}>
          <SectionTitle>You may also like</SectionTitle>
          <div className={style["merch-detail__related-grid"]}>
            {relatedMerchs.map((item) => (
              <MerchCard key={item.id} {...item} href={`/merch/${item.id}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
