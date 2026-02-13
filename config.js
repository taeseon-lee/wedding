// ============================================
// 모바일 청첩장 설정 파일
// 이 파일에서 문구, 계좌정보 등을 쉽게 수정할 수 있습니다.
// ※ OG 메타 태그(index.html <head>)는 크롤러가 JS를 실행하지 않으므로 직접 수정 필요
// ============================================

const CONFIG = {
  // 결혼식 정보
  wedding: {
    date: new Date('2026-11-29T14:00:00'),
    dateText: '2026년 11월 29일 일요일 오후 2시',
    venue: '문정 루이비스',
    hall: '그레이스홀',
    address: '서울특별시 송파구 문정동 645-2 B1층',
    mapUrl: 'https://kko.to/iBaoSNDZ_1',
    naverMapUrl: 'https://naver.me/Gctrli34'
  },

  // 신랑 정보
  groom: {
    name: '이태선',
    phone: '010-7197-6550',
    father: '이병남',
    mother: '신정옥',
    fatherDeceased: false,
    motherDeceased: false
  },

  // 신부 정보
  bride: {
    name: '이승진',
    phone: '010-9114-6322',
    father: '이도형',
    mother: '이향희',
    fatherDeceased: false,
    motherDeceased: false
  },

  // 인사말
  greeting: {
    title: '소중한 분들을 초대합니다',
    message: `두 사람이 만나
오랜 시간 함께 걸어왔습니다.

이제 부부라는 이름으로
새로운 길을 시작하려 합니다.

소중한 날, 가까이에서 축복해 주신다면
더없는 기쁨이 되겠습니다.`
  },

  // 오시는 길 정보
  location: {
    subway: '8호선 문정역 3번 출구 도보 9분',
    parking: '웨딩홀 주차장 이용 시 2시간 무료 주차',
    shuttle: '문정역 ↔ 웨딩홀 셔틀버스 운행'
  },

  // 계좌 정보
  accounts: {
    groom: [
      { relation: '신랑', bank: '기업은행', number: '98209524601019', holder: '이태선' },
      { relation: '신랑 아버지', bank: '은행명', number: '--------', holder: '이병남' },
      { relation: '신랑 어머니', bank: '은행명', number: '---------', holder: '신정옥' }
    ],
    bride: [
      { relation: '신부', bank: '신한', number: '110488665484', holder: '이승진' },
      { relation: '신부 아버지', bank: '은행명', number: '--------', holder: '이도형' },
      { relation: '신부 어머니', bank: '은행명', number: '--------', holder: '이향희' }
    ]
  },

  // 갤러리 이미지 목록 (images 폴더 내 파일명)
  gallery: [
    'photo1.png',
    // 'photo2.jpg',
    // 'photo3.png',
    // 'photo4.png',
    // 'photo5.png',
    // 'photo6.png',
    // 'photo7.png',
    // 'photo8.png',
    // 'photo9.png',
    // 'photo10.png',
    // 'photo11.png',
    // 'photo12.png',
    // 'photo13.png'
  ]
};
