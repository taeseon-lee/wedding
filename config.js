// ============================================
// 모바일 청첩장 설정 파일
// 이 파일에서 문구, 계좌정보 등을 쉽게 수정할 수 있습니다.
// ============================================

const CONFIG = {
  // 결혼식 정보
  wedding: {
    date: new Date('2026-11-29T14:00:00'),
    dateText: '2026년 11월 29일 일요일 오후 2시',
    venue: '문정 루이비스',
    hall: '그레이스홀',
    address: '서울특별시 송파구 문정동 645-2 B1층',
    mapUrl: 'https://map.kakao.com/link/map/문정루이비스,37.4851,127.1229'
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

  // 인사말 (줄바꿈은 \n 사용)
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

  // 계좌 정보 (참조 페이지 정보 - 나중에 수정 필요)
  accounts: {
    groom: [
      { relation: '신랑', bank: '새마을금고', number: '9003240159711', holder: '김용훈' },
      { relation: '신랑 아버지', bank: '토스뱅크', number: '100062123188', holder: '김동국' },
      { relation: '신랑 어머니', bank: '기업은행', number: '10806099002039', holder: '권혁미' }
    ],
    bride: [
      { relation: '신부', bank: '기업은행', number: '46704969901015', holder: '전현지' },
      { relation: '신부 어머니', bank: '농협', number: '81507356149079', holder: '신종순' }
    ]
  },

  // 갤러리 이미지 목록 (images 폴더 내 파일명)
  gallery: [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.png',
    'photo4.png',
    'photo5.png',
    'photo6.png',
    'photo7.png',
    'photo8.png',
    'photo9.png',
    'photo10.png',
    'photo11.png',
    'photo12.png',
    'photo13.png',
    'photo14.png',
    'photo15.png',
    'photo16.png'
  ]
};
