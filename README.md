# SIMILE LAND

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-20232a?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88ce02)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-c5f74f?logo=drizzle)
![Spotify API](https://img.shields.io/badge/Spotify-API-1db954?logo=spotify&logoColor=white)

SIMILE LAND 밴드의 음악과 기록을 담은 팬메이드 웹 프로젝트입니다.  
디스코그래피, 공연 일정, 굿즈 등 밴드와 관련된 콘텐츠를 하나의 웹 아카이브 형태로 구성했습니다.

---

## Preview

> 추후 프로젝트 스크린샷 또는 GIF 추가 예정

- 홈 인트로 애니메이션
- 디스코그래피 인터랙션
- Spotify 기반 앨범 상세 페이지

---

## Features

### Home

- GSAP + SplitType 기반 텍스트 인트로 애니메이션
- 밴드 소개 및 최신 콘텐츠 미리보기
- 디스코그래피 / 굿즈 섹션 연결

### Discography

- Spotify Web API 기반 앨범 및 트랙 데이터 조회
- 앨범 목록 및 상세 페이지 구현
- 동적 라우팅 기반 디스코그래피 구조

### Store

- 굿즈 목록 및 상세 페이지 구현 예정

### Schedule

- 공연 일정 페이지 구현 예정

---

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- SCSS Modules
- GSAP
- TanStack Query

### Backend / Data

- Next.js Route Handlers
- Drizzle ORM
- PostgreSQL
- Spotify Web API

---

## Implementation Details

### Spotify API 연동

Spotify Web API를 통해 앨범 및 트랙 데이터를 조회합니다.

- Access Token 기반 인증 처리
- 앨범 상세 정보 및 트랙 리스트 조회
- API 요청 에러 핸들링

### 데이터 캐싱

Spotify API의 호출 제한(429)에 대응하기 위해 캐싱 전략을 적용했습니다.

- `revalidate` 기반 캐싱
- 불필요한 API 요청 최소화
- 서버 컴포넌트 기반 데이터 패칭 구조 구성

### UI / Animation

사용자 경험을 강화하기 위해 애니메이션 기반 인터랙션을 적용했습니다.

- GSAP 기반 텍스트 모션
- SplitType 기반 텍스트 분리 애니메이션

---

## Current Status

### 구현 완료

- 홈 페이지
- 디스코그래피 목록 / 상세
- Spotify API 연동
- 기본 상품 페이지 구조

### 개발 예정

- 장바구니 / 주문 기능
- 공연 일정 기능
- 반응형 및 접근성 개선
- 플레이어 인터랙션 고도화

---

## Routes

| Route                    | Description |
| ------------------------ | ----------- |
| `/`                      | 홈          |
| `/discography`           | 앨범 목록   |
| `/discography/[albumId]` | 앨범 상세   |
| `/product`               | 굿즈 목록   |
| `/product/[id]`          | 굿즈 상세   |
| `/cart`                  | 장바구니    |
| `/order`                 | 주문        |
| `/schedule`              | 공연 일정   |

---

## Environment Variables

아래 환경변수가 필요합니다.

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_ARTIST_ID=
DATABASE_URL=
```
