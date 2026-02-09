const getImg = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;

export const products = [
  {
    id: 1,
    name: 'Digital Planner V.1',
    price: 24.9,
    bgColor: '#f3e8ff',
    description:
      'Nicht nur Termine verwalten, sondern Zeit erleben. Dein täglicher Rückzugsort.',
    details: 'Optimiert für GoodNotes. Über 300 verlinkte Seiten.',
    shipping: 'Sofortiger Download.',
    rating: 4.9,
    reviews: 124,
    images: [
      getImg('1586075010620-2d5519d834bb'),
      getImg('1484480974693-6ca0a78fb36b'),
    ],
  },
  {
    id: 2,
    name: 'Sticker Set "Minimal"',
    price: 9.9,
    bgColor: '#fae8ff',
    description: 'Kleine Momente der Freude. 150+ Sticker für mehr Struktur.',
    details: 'Transparente PNGs.',
    shipping: 'Download.',
    rating: 4.8,
    reviews: 89,
    images: [
      getImg('1554177255-61502b352de3'),
      getImg('1531232822002-990a886ca495'),
    ],
  },
  {
    id: 3,
    name: 'Focus Journal',
    price: 18.5,
    bgColor: '#ede9fe',
    description:
      'Ein stiller Dialog mit dir selbst. Geführte Fragen für mehr Achtsamkeit.',
    details: 'Interaktive PDF.',
    shipping: 'Download.',
    rating: 5.0,
    reviews: 42,
    images: [
      getImg('1499750310107-5fef28a66643'),
      getImg('1544376798-89aa6b82c975'),
    ],
  },
  {
    id: 4,
    name: 'Vision Board Pro',
    price: 12.0,
    bgColor: '#f0fdf4',
    description: 'Visualisiere das Leben, das auf dich wartet.',
    details: 'Drag & Drop Elemente.',
    shipping: 'Download.',
    rating: 4.7,
    reviews: 56,
    images: [
      getImg('1471107340929-a87cd0f5b5f3'),
      getImg('1434030216411-0b793f4b4173'),
    ],
  },
  {
    id: 5,
    name: 'Meal Planner Kit',
    price: 14.9,
    bgColor: '#fff7ed',
    description: 'Achtsamkeit beginnt auf dem Teller.',
    details: 'Wöchentliche Vorlagen.',
    shipping: 'Download.',
    rating: 4.8,
    reviews: 210,
    images: [
      getImg('1484480974693-6ca0a78fb36b'),
      getImg('1498837167922-ddd27525d352'),
    ],
  },
  {
    id: 6,
    name: 'Finance Tracker',
    price: 19.9,
    bgColor: '#eff6ff',
    description: 'Freiheit durch Klarheit. Verstehe deine Finanzströme.',
    details: 'Automatisierte Summen.',
    shipping: 'Download.',
    rating: 4.9,
    reviews: 95,
    images: [
      getImg('1554224155-8d04cb21cd6c'),
      getImg('1551288049-bebda4e38f71'),
    ],
  },
  {
    id: 7,
    name: 'Content Creator Kit',
    price: 29.9,
    bgColor: '#fff1f2',
    description:
      'Vom Chaos zum Content. Plane Posts, Reels und Kooperationen an einem Ort.',
    details: 'Redaktionsplan, Analytics-Tracker, Hashtag-Manager.',
    shipping: 'Download.',
    rating: 4.9,
    reviews: 34,
    images: [
      getImg('1611162617474-5b21e879e113'),
      getImg('1611162616475-46b635cb6868'),
    ],
  },
  {
    id: 8,
    name: 'Executive Strategy Deck',
    price: 39.9,
    bgColor: '#f8fafc',
    description:
      'Strategie statt operative Hektik. Das Tool für Führungskräfte.',
    details: 'OKRs, Quartalsplanung, Team-Leadership Templates.',
    shipping: 'Download.',
    rating: 5.0,
    reviews: 12,
    images: [
      getImg('1553877606-352363042e46'),
      getImg('1454165804606-c3d57bc86b40'),
    ],
  },
  {
    id: 9,
    name: 'Deep Work Workbook',
    price: 16.5,
    bgColor: '#f5f5f4',
    description:
      'Training für deinen Fokus-Muskel. Blocke Ablenkungen systematisch.',
    details: 'Pomodoro-Templates, Distraction-Log, Flow-State Guide.',
    shipping: 'Download.',
    rating: 4.7,
    reviews: 28,
    images: [
      getImg('1506784983877-45594efa4cbe'),
      getImg('1434030216411-0b793f4b4173'),
    ],
  },
];

export { getImg };
