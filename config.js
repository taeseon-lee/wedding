// ============================================
// 모바일 청첩장 설정 파일
// 이 파일에서 문구, 계좌정보 등을 쉽게 수정할 수 있습니다.
// ※ OG 메타 태그(index.html <head>)는 크롤러가 JS를 실행하지 않으므로 직접 수정 필요
// ============================================

const CONFIG = {
  // 신부 측 피로연 안내 팝업
  reception: {
    title: '신부 측 피로연 안내',
    message: `먼 거리로 인해 본식에 참석하기 어려운 분들을 위해 혼례에 앞서 작은 피로연 자리를 마련하였습니다.

부디 함께하시어 두 사람의 앞날을 축복해 주시면 감사하겠습니다.`,
    date: '2026년 10월 24일 토요일',
    time: '오전 11시 ~ 오후 2시',
    venue: '해남군 황산면 황산식당',
    kakaoMapUrl: 'https://kko.to/LTd0LS-pRq',
    naverMapUrl: 'https://naver.me/51u1gWfb'
  },

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
    message: `인생이라는 게임의 완벽한 파트너를 만났습니다.
보드게임판 앞에서 마주 앉아
즐겁게 웃던 저희 두 사람이
이제는 같은 곳을 바라보며 
평생을 약속하려 합니다.
어떠한 난관이 찾아와도 
서로의 버팀목이 되어주고
모든 기쁨의 순간을 웃으며 
함께하는 한 팀이 되겠습니다.
이제 각자가 아닌 부부라는 이름으로 시작하는
저희 여정의 첫 번째 라운드에 
소중한 분들을 초대합니다.`
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
      { relation: '신랑', bank: '기업은행', number: '982-095246-01-019', holder: '이태선' },
      { relation: '신랑 아버지', bank: '농협', number: '601099-56-124768', holder: '이병남' },
    ],
    bride: [
      { relation: '신부', bank: '신한', number: '110-488-665484', holder: '이승진' },
      { relation: '신부 아버지', bank: '신한', number: '110-114-266153', holder: '이도형' },
      { relation: '신부 어머니', bank: '신한', number: '110-214-203619', holder: '이향희' }
    ]
  },

  // 갤러리 이미지 목록 (images 폴더 내 파일명)
  gallery: [
    "wedding_001.webp",
    "wedding_002.webp",
    "wedding_003.webp",
    "wedding_004.webp",
    "wedding_005.webp",
    "wedding_006.webp",
    "wedding_007.webp",
    "wedding_008.webp",
    "wedding_009.webp",
    "wedding_010.webp",
    "wedding_011.webp",
    "wedding_012.webp",
    "wedding_013.webp",
    "wedding_014.webp",
    "wedding_015.webp",
    "wedding_016.webp",
    "wedding_017.webp",
    "wedding_018.webp",
    "wedding_019.webp",
    "wedding_020.webp",
    "wedding_021.webp"
  ]
};
