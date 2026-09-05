import type { Speaker, EventEdition, TeamMember, GalleryItem, TicketPass } from '../types';

export const UPCOMING_EVENT = {
  edition: 'PCUxTEDx 2026',
  theme: 'Ideas Beyond Boundaries',
  tagline: 'When bold curiosity meets radical collaboration, boundaries cease to define us.',
  date: 'November 14, 2026',
  targetDate: '2026-11-14T09:30:00+05:30',
  time: '09:30 AM – 06:00 PM IST',
  venue: 'Grand Auditorium, Central Academic Block',
  location: 'PCU Campus, Pune, Maharashtra, India',
  status: 'Registrations Open',
  seatsLeft: 84,
  totalSeats: 600,
  highlights: [
    '8 Powerful TEDx Stage Talks',
    'Interactive Innovation & Tech Playground',
    'Curated Executive Networking Lunch',
    'Official TEDx Delegate Kit & Merch',
    'Certified Attendance & Access to HD Talk Archives'
  ]
};

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: 'dr-ananya-roy',
    name: 'Dr. Ananya Roy',
    profession: 'Cognitive Neuroscientist',
    organization: 'Center for Brain Research',
    talkTitle: 'The Biology of Intuition: Can Machines Ever Truly Feel What We Know?',
    shortDescription: 'Why human gut feelings and emotional memory remain deeply biological—and why algorithms cannot replicate real empathy without human experience.',
    fullAbstract: 'Every day, we make thousands of decisions based on instincts we cannot easily articulate. Dr. Roy explores how our nervous system processes decades of subconscious experience into split-second insight, and why preserving human intuition is essential as algorithmic decision-making expands into education and healthcare.',
    quote: 'Intuition isn’t magic—it is the quiet wisdom of thousands of forgotten moments reminding us who we are.',
    topic: 'Human Mind & Brain Science',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    sessionTime: '10:15 AM - 10:45 AM',
    keyTakeaways: [
      'The neurological roots of instinctive decision-making',
      'Why human empathy cannot be reduced to statistical prediction',
      'Simple daily habits that sharpen genuine cognitive focus'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'kabir-mehta',
    name: 'Kabir Mehta',
    profession: 'Architect & Ecological Designer',
    organization: 'Studio TerraForm',
    talkTitle: 'What Ancient Forests Teach Us About Modern Cities',
    shortDescription: 'How traditional vernacular materials like bamboo, clay, and timber can cool our overheating concrete urban centers naturally.',
    fullAbstract: 'Modern cities trap immense heat through asphalt and glass facades. Kabir demonstrates how learning from centuries-old architectural wisdom and vernacular cooling techniques allows us to build university campuses and residential neighborhoods that breathe naturally with surrounding air currents.',
    quote: 'Good architecture does not fight nature; it invites nature in to do the heavy lifting.',
    topic: 'Architecture & Sustainable Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    sessionTime: '11:15 AM - 11:45 AM',
    keyTakeaways: [
      'Passive airflow principles borrowed from traditional monsoon houses',
      'The environmental cost of concrete and how bio-materials reduce it',
      'Low-cost urban design fixes any student community can adopt'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'tara-deshmukh',
    name: 'Tara Deshmukh',
    profession: 'Astrophysicist & Educator',
    organization: 'Inter-University Centre for Astronomy',
    talkTitle: 'Listening to the Cosmos: What Colliding Stars Sound Like',
    shortDescription: 'How detecting gravitational ripples in space gave astronomers ears to listen to black holes billions of years in the past.',
    fullAbstract: 'For thousands of years, humanity studied the heavens purely with eyes and optical lenses. Tara explains how gravitational wave detectors opened a whole new sense—allowing us to literally hear the deep bass frequencies of cosmic collisions that occurred before Earth existed.',
    quote: 'When you realize the night sky is not a silent photograph but an active symphony, your sense of scale changes forever.',
    topic: 'Space Exploration',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    sessionTime: '12:00 PM - 12:30 PM',
    keyTakeaways: [
      'How laser interferometers detect distortions smaller than an atomic nucleus',
      'The journey of building grassroots space clubs in universities',
      'Why curiosity-driven astronomy matters to practical life on Earth'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'vikram-iyer',
    name: 'Vikram Iyer',
    profession: 'Social Entrepreneur',
    organization: 'GraminPay Initiative',
    talkTitle: 'The Hidden Economy: Why Street Vendors Deserve Better Tools',
    shortDescription: 'Rethinking financial dignity for informal micro-entrepreneurs who power our everyday neighborhoods without safety nets.',
    fullAbstract: 'Across every Indian city, millions of vegetable vendors, chai artisans, and repair workers drive the daily economy without access to fair working credit. Vikram shares stories from three years on the streets building community-backed micro-networks that eliminate predatory lenders.',
    quote: 'True innovation is not measured by Silicon Valley valuation, but by whether a street vendor can sleep with peace of mind.',
    topic: 'Social Impact & Grassroots Action',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    sessionTime: '02:00 PM - 02:30 PM',
    keyTakeaways: [
      'The real economics of the informal university neighborhood ecosystem',
      'Why trust-based community lending outperforms automated algorithms',
      'How students can volunteer their skills to local small businesses'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'dr-zoya-qureshi',
    name: 'Dr. Zoya Qureshi',
    profession: 'Biochemist & Microbiology Researcher',
    organization: 'Environmental Biotech Lab',
    talkTitle: 'Can Microbes Clean Up Our Mess? Nature’s Hidden Plastic Eaters',
    shortDescription: 'How ordinary soil bacteria and enzymes are evolving natural solutions to breakdown single-use plastics.',
    fullAbstract: 'Plastic has been on Earth for barely a century, but nature is already adapting. Dr. Qureshi presents promising research on bacterial strains discovered in composting yards that produce natural enzymes capable of decomposing PET bottles safely into organic matter.',
    quote: 'Nature doesn’t panic. It patiently designs chemistry to heal what we break.',
    topic: 'Biology & Environmental Solutions',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    sessionTime: '02:45 PM - 03:15 PM',
    keyTakeaways: [
      'How enzyme bio-recycling works in simple scientific terms',
      'What realistic timelines look like for industrial bio-remediation',
      'Practical ways to curb single-use waste on college campuses'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'arjun-nair',
    name: 'Arjun Nair',
    profession: 'Acoustic Designer & Sound Artist',
    organization: 'Sound & Space Research',
    talkTitle: 'What Silence Sounds Like in a World That Never Stops Talking',
    shortDescription: 'Why chronic urban noise fractures our attention spans, and how intentional acoustic spaces restore mental calm.',
    fullAbstract: 'We live inside an unbroken wall of sirens, notifications, traffic, and headphones. Arjun demonstrates how deliberate acoustic pause and natural soundscapes lower heart rate, restore memory retention, and give creative thinkers the mental room to breathe.',
    quote: 'Silence is not the absence of sound; it is the presence of attention.',
    topic: 'Psychology & Creative Arts',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    sessionTime: '03:45 PM - 04:15 PM',
    keyTakeaways: [
      'The measurable toll of background decibel noise on cognitive fatigue',
      'How to create an acoustic sanctuary in a student dorm room',
      'The lost art of active, patient listening in everyday conversations'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

export const EVENTS_TIMELINE: EventEdition[] = [
  {
    year: '2025',
    theme: 'Echoes of Tomorrow',
    tagline: 'Listening to the future before it speaks.',
    date: 'October 18, 2025',
    venue: 'PCU Central Convention Hall',
    speakersCount: 8,
    attendeesCount: 520,
    description: 'A sold-out summit interrogating the future of generative creative arts, interstellar deep exploration, and decentralized democracy. Features included an immersive spatial audio exhibition and live generative art installations.',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    talksHighlight: [
      'The Ethics of Synthetic Empathy in Autonomous Healthcare',
      'Re-imagining Democratic Governance on Distributed Ledgers',
      'Quantum Sensors: Peering Through the Earth’s Hidden Crust'
    ]
  },
  {
    year: '2024',
    theme: 'Catalyst: Sparking Momentum',
    tagline: 'The smallest spark ignites the greatest revolution.',
    date: 'November 04, 2024',
    venue: 'PCU Grand Amphitheatre',
    speakersCount: 7,
    attendeesCount: 450,
    description: 'Focused on high-velocity grassroots change. From indigenous forest revival techniques to open-source medical prosthetics, Catalyst united young innovators ready to dismantle inertia.',
    coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop',
    talksHighlight: [
      '3D Printing Bionic Limbs for Under Fifty Dollars',
      'Rewilding Degraded Monoculture: Lessons from Sahyadri Forests',
      'The Philosophy of Speed in an Era of Burnout'
    ]
  },
  {
    year: '2023',
    theme: 'Uncharted: Beyond the Familiar',
    tagline: 'Venturing into spaces that demand courage.',
    date: 'December 09, 2023',
    venue: 'PCU Academic Theatre 1',
    speakersCount: 6,
    attendeesCount: 380,
    description: 'The inaugural edition of PCUxTEDx that set the standard for thought leadership on campus. Six trailblazers challenged conventional thinking across quantum mechanics, street culture, and climate resilience.',
    coverImage: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    talksHighlight: [
      'Decoding the Hidden Cryptography of Classical Indian Rhythms',
      'Urban Rewilding: How Tiny Rooftop Forests Regulate Megacities',
      'From Dorm Room to Orbit: The Story of India’s Youngest CubeSat'
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  // Organizing Team
  {
    id: 'tm-1',
    name: 'Advait Kulkarni',
    position: 'Licensee & Lead Organizer',
    department: 'Organizing Team',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Bringing world-class ideas directly to our campus stage is not just an event; it is a movement.'
  },
  {
    id: 'tm-2',
    name: 'Rhea Sengupta',
    position: 'Co-Organizer & Executive Director',
    department: 'Organizing Team',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Every detail in PCUxTEDx is engineered to create an indelible spark in someone’s mind.'
  },

  // Curators
  {
    id: 'tm-3',
    name: 'Devansh Joshi',
    position: 'Lead Curator',
    department: 'Curators',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'We don’t look for polished speeches; we unearth raw, paradigm-shifting ideas that matter.'
  },
  {
    id: 'tm-4',
    name: 'Meera Nambiar',
    position: 'Speaker Coach & Curation Associate',
    department: 'Curators',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'The 18-minute TED talk is an art form. Refining it with each speaker is pure magic.'
  },

  // Creative Team
  {
    id: 'tm-5',
    name: 'Siddharth Patil',
    position: 'Head of Creative & Brand Identity',
    department: 'Creative Team',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Designing for TEDx means respecting the red circle while breaking every conventional visual box.'
  },
  {
    id: 'tm-6',
    name: 'Ananya Sharma',
    position: 'Stage & Scenography Designer',
    department: 'Creative Team',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'The physical stage is the vessel where ideas transform into unforgettable memory.'
  },

  // Marketing & PR
  {
    id: 'tm-7',
    name: 'Karan Mehra',
    position: 'Head of Marketing & Digital Media',
    department: 'Marketing & PR',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'We broadcast stories that make people pause their scrolling and question their assumptions.'
  },
  {
    id: 'tm-8',
    name: 'Tanvi Bhosale',
    position: 'Editorial & Public Relations Lead',
    department: 'Marketing & PR',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Connecting university brilliance with mainstream cultural discourse.'
  },

  // Operations
  {
    id: 'tm-9',
    name: 'Rohan Varma',
    position: 'Director of Logistics & Operations',
    department: 'Operations',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Flawless execution is invisible; it allows the intellect on stage to take center stage.'
  },
  {
    id: 'tm-10',
    name: 'Pooja Hegde',
    position: 'Delegate Experience & Venue Manager',
    department: 'Operations',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'From registration to the closing applause, every attendee’s journey is meticulously curated.'
  },

  // Sponsorship
  {
    id: 'tm-11',
    name: 'Aakash Singhania',
    position: 'Head of Corporate Partnerships & Sponsorship',
    department: 'Sponsorship',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'We partner with visionary organizations who genuinely invest in youth-led intellectual capital.'
  },

  // Technical Team
  {
    id: 'tm-12',
    name: 'Ishaan Chopra',
    position: 'Technical Lead & Web Architect',
    department: 'Technical Team',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Crafting digital experiences that match the high-fidelity standard of the TEDx global network.'
  },
  {
    id: 'tm-13',
    name: 'Sneha Chawla',
    position: 'AV & Broadcast Engineer',
    department: 'Technical Team',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    quote: 'Crystal clear audio and 4K multi-cam feeds ensure these ideas echo worldwide.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Iconic Red Dot Under Spotlight',
    category: 'stage',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'The moment before the auditorium doors open. Silence before the thunder of ideas.'
  },
  {
    id: 'gal-2',
    title: 'Dr. Ananya Roy in Mid-Flow',
    category: 'speakers',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    caption: 'Explaining synaptic neural loops to an enraptured audience during PCUxTEDx 2025.'
  },
  {
    id: 'gal-3',
    title: 'Full House in Grand Auditorium',
    category: 'audience',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'Over 500 delegates leaning in unison, hanging on every spoken word.'
  },
  {
    id: 'gal-4',
    title: 'Production Control & Multi-cam Rig',
    category: 'behind the scenes',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/3]',
    caption: 'The student broadcast team coordinating camera angles for the official global TEDx YouTube release.'
  },
  {
    id: 'gal-5',
    title: 'Deep Focus Speaker Rehearsals',
    category: 'speakers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    caption: 'Backstage coaching and timing calibration 48 hours prior to live stage delivery.'
  },
  {
    id: 'gal-6',
    title: 'Design Thinking Ideation Sprint',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'Post-talk interactive workshops where attendees collaborate directly on actionable local solutions.'
  },
  {
    id: 'gal-7',
    title: 'The Organizing Committee Unity',
    category: 'team',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'Thirty student organizers who spent nine relentless months turning a vision into reality.'
  },
  {
    id: 'gal-8',
    title: 'Standing Ovation Moment',
    category: 'audience',
    image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/3]',
    caption: 'Delegates standing to honor an unforgettable talk on pediatric bionic innovation.'
  },
  {
    id: 'gal-9',
    title: 'Immersive Stage Atmosphere',
    category: 'stage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'Precision red beam stage lighting accentuating the central speaker circle.'
  },
  {
    id: 'gal-10',
    title: 'Robotics & Bio-Material Lab Showcase',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/3]',
    caption: 'Interactive tactile demo tables stationed throughout the convention foyer.'
  },
  {
    id: 'gal-11',
    title: 'Speaker Green Room Debrief',
    category: 'behind the scenes',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'Cross-pollinating ideas: neuroscientists chatting with urban architects over afternoon espresso.'
  },
  {
    id: 'gal-12',
    title: 'Core Leadership In Action',
    category: 'team',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
    caption: 'The logistics and technical command center keeping every session precisely on schedule.'
  }
];

export const TICKET_PASSES: TicketPass[] = [
  {
    id: 'student-pass',
    name: 'Student Delegate Pass',
    price: '₹499',
    numericPrice: 499,
    badge: 'Limited Student Quota',
    perks: [
      'Full-day access to all 8 TEDx talks',
      'Official PCUxTEDx delegate kit & badge',
      'Interactive Workshop & Tech Playground access',
      'High-speed networking tea breaks & refreshments',
      'Digital Certificate of Participation'
    ]
  },
  {
    id: 'general-pass',
    name: 'General Access Pass',
    price: '₹899',
    numericPrice: 899,
    badge: 'Most Popular',
    popular: true,
    perks: [
      'Prime tier auditorium seating',
      'Curated executive networking buffet lunch',
      'Exclusive PCUxTEDx branded hoodie & tote bag',
      'Priority Q&A session with selected speakers',
      'Access to full 4K HD recorded talk archives',
      'Invitation to the post-event social mixer'
    ]
  },
  {
    id: 'vip-pass',
    name: 'Patron / VIP Experience',
    price: '₹1,999',
    numericPrice: 1999,
    badge: 'Exclusive 30 Seats',
    perks: [
      'Front row VIP lounge reserved seating',
      'Private Speaker Green Room networking reception',
      'Signed commemorative publication & collector coin',
      'Personalized introduction to speaker panel',
      'Direct inclusion in official event credits & partners guide'
    ]
  }
];

export const VALID_PROMO_CODES: { code: string; type: 'percentage' | 'flat'; value: number; description: string }[] = [
  { code: 'TEDX10', type: 'percentage', value: 10, description: '10% Delegate Discount' },
  { code: 'PCUSTUDENT', type: 'flat', value: 150, description: '₹150 Campus Student Subsidy' },
  { code: 'EARLYBIRD', type: 'percentage', value: 15, description: '15% Limited Early Bird Special' },
];

export const PILLARS_DATA = [
  {
    id: 'vision',
    number: '01',
    title: 'Vision',
    subtitle: 'Catalyzing Intellectual Awakening',
    description: 'To position our university as an epicenter of intellectual courage, where groundbreaking thinking from science, art, humanities, and entrepreneurship converges to reshape global trajectories.'
  },
  {
    id: 'mission',
    number: '02',
    title: 'Mission',
    subtitle: 'Elevating Voices That Matter',
    description: 'Curating, nurturing, and broadcasting ideas that transcend traditional academic silos. We dismantle passive consumption and ignite active student problem-solving for real-world impact.'
  },
  {
    id: 'community',
    number: '03',
    title: 'Community',
    subtitle: 'A Tribe of Incurably Curious Minds',
    description: 'More than an annual conference — an enduring ecosystem of creators, researchers, coders, writers, and dreamers who challenge cynicism and foster radical empathy.'
  },
  {
    id: 'ideas',
    number: '04',
    title: 'Ideas Worth Spreading',
    subtitle: 'The Global TEDx Ethos',
    description: 'Operating under official license from TED, we celebrate the transformative alchemy of 18-minute narratives capable of shifting perspectives and sparking irreversible change.'
  }
];
