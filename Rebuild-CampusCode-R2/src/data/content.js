export const MARQUEE = ['IDEAS', 'PEOPLE', 'PRODUCTS', 'INNOVATION', 'COMMUNITY']

export const ABOUT_PILLARS = [
  { no: '01', title: 'STUDENTS', text: 'Discover opportunities, form teams and build real projects.' },
  { no: '02', title: 'ORGANIZERS', text: 'Host hackathons, manage events and engage talent.' },
  { no: '03', title: 'HACKATHONS', text: 'Participate, collaborate and build together.' },
]

export const STEPS = [
  { no: '01', title: 'DISCOVER', text: 'Find a challenge that makes you want to build.' },
  { no: '02', title: 'TEAM UP', text: 'Find people who share your ambition.' },
  { no: '03', title: 'BUILD', text: 'Turn your idea into something people can use.' },
  { no: '04', title: 'SHIP', text: 'Submit your work and take it to the arena.' },
]

export const TRACKS = [
  { id: 'ai', status: 'LIVE', title: 'AI INNOVATION', text: 'Build intelligent solutions for problems that matter.' },
  { id: 'web', status: 'OPEN', title: 'FUTURE WEB', text: 'Design and ship the next generation of digital experiences.' },
  { id: 'campus', status: 'UPCOMING', title: 'CAMPUS TECH', text: 'Create technology that makes student life better.' },
]

export const PEOPLE = [
  { title: 'Build with developers.', note: 'Ship the product beside people who like the hard parts.' },
  { title: 'Think with designers.', note: 'Shape the experience before a single screen is final.' },
  { title: 'Compete with builders.', note: 'Take the work into the arena and see it hold up.' },
]

export const STORY = [
  { kicker: '01', title: 'A challenge worth opening.', text: 'Hackathons, quizzes and campus problems sit in one place, ready when you are.' },
  { kicker: '02', title: 'People who want the same thing.', text: 'Developers, designers and organizers share one ecosystem instead of scattered group chats.' },
  { kicker: '03', title: 'Something people can use.', text: 'The point is a working piece of work, not a slide that never leaves the laptop.' },
  { kicker: '04', title: 'Into the arena.', text: 'Submit it, stand next to other builders, and keep the next project moving.' },
]

export const LOGIN_CARDS = [
  { no: '01', title: 'BUILD' },
  { no: '02', title: 'COMPETE' },
  { no: '03', title: 'SHIP' },
]

export const REGISTER_CARDS = [
  { no: '01', meta: 'IDENTITY', title: 'CREATE', text: 'Build your student profile and enter the CampusCode ecosystem.' },
  { no: '02', meta: 'TEAM', title: 'COLLABORATE', text: 'Find teammates and build projects together.' },
  { no: '03', meta: 'ARENA', title: 'COMPETE', text: 'Join hackathons and turn ideas into submissions.' },
]

export const FOOTER = {
  product: [
    { label: 'About', href: '/#about' },
    { label: 'Hackathons', href: '/#arena' },
    { label: 'How it works', href: '/#how' },
    { label: 'Community', href: '/#community' },
  ],
  builders: [
    { label: 'Students', href: '/register' },
    { label: 'Teams', href: '/#community' },
    { label: 'Organizers', href: '/contact' },
    { label: 'Developers', href: '/#how' },
  ],
  guides: [
    { label: 'Hackathon Rules', href: '/rules' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/support' },
    { label: 'Contact', href: '/contact' },
  ],
}

export const NAV = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'HOW IT WORKS', href: '/#how' },
  { label: 'HACKATHONS', href: '/#arena' },
  { label: 'COMMUNITY', href: '/#community' },
]

export const PAID_INVITE_CODE = 'CC2026'

export const EVENTS = [
  {
    type: 'hackathon',
    category: 'Hackathon',
    id: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1',
    status: 'LIVE',
    timing: 'upcoming',
    circle: 'RE',
    title: "ReBuild '26",
    paid: true,
    description:
      "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.",
    short: 'Individual dashboard-recreation hackathon. Recreate the CampusCode user flow, then ship a new UI.',
    location: 'CampusCode Portal',
    date: 'Nov 06, 2026',
    dateIso: '2026-11-06',
    facts: [['Mode', 'Online'], ['Team size', 'Individual'], ['Start', 'Nov 06, 2026']],
  },
  {
    type: 'quiz',
    category: 'Quiz',
    id: '20864c76-4792-4b09-a2e9-ff6764bf20d6',
    status: 'COMPLETED',
    timing: 'past',
    circle: 'FQ',
    title: "FirstCommit '26 Quiz Competition 2.0",
    kind: 'QUIZ · SOLO · TIMED',
    description: 'This is the reattempt quiz those who missed',
    short: 'Reattempt quiz for anyone who missed the first FirstCommit sitting.',
    location: 'Online',
    date: '—',
    dateIso: null,
    facts: [['Mode', 'Online'], ['Format', 'Solo'], ['Start', '—']],
  },
  {
    type: 'quiz',
    category: 'Quiz',
    id: '80299fc1-3e30-466f-a146-fd45c77c84be',
    status: 'COMPLETED',
    timing: 'past',
    circle: 'FQ',
    title: "FirstCommit '26 Quiz Competition",
    kind: 'QUIZ · SOLO · TIMED',
    description:
      'The quiz features 50 questions across technology, AI, and engineering — 42 multiple-choice questions and 8 true/false questions — to be completed in 30 minutes on Sunday, 1 November 2026. It is conducted online on the CampusCode platform, and every participant gets a single attempt.',
    short: '50 questions on tech, AI and engineering. One attempt, 30 minutes, online.',
    location: 'Online',
    date: 'Nov 01, 2026',
    dateIso: '2026-11-01',
    facts: [['Mode', 'Online'], ['Format', 'Solo'], ['Start', 'Nov 01, 2026']],
  },
  {
    type: 'workshop',
    category: 'Workshop',
    id: 'cc-workshop-build-night',
    status: 'UPCOMING',
    timing: 'upcoming',
    circle: 'BN',
    title: 'CampusCode Build Night',
    description:
      'A hands-on evening workshop for shipping a small product slice with CampusCode mentors. Bring a laptop. Certificates for attendees who finish the build checklist.',
    short: 'Hands-on evening workshop. Ship a small product slice with mentors.',
    location: 'GGSIPU',
    date: 'Nov 14, 2026',
    dateIso: '2026-11-14',
    facts: [['Mode', 'In person'], ['Format', 'Workshop'], ['Start', 'Nov 14, 2026']],
  },
  {
    type: 'meetup',
    category: 'Meetup',
    id: 'cc-meetup-arena',
    status: 'UPCOMING',
    timing: 'upcoming',
    circle: 'AR',
    title: 'Arena Orientation Meetup',
    description:
      'Meet the CampusCode community, learn how hackathon rounds work, and pick up the Student Guide in person. Open to every registered student.',
    short: 'Community meetup covering arena rounds, teams and the student guide.',
    location: 'GGSIPU',
    date: 'Nov 18, 2026',
    dateIso: '2026-11-18',
    facts: [['Mode', 'In person'], ['Format', 'Meetup'], ['Start', 'Nov 18, 2026']],
  },
]

export const MY_EVENT_SEED = [
  {
    eventId: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1',
    registration: '779d5af0-34d2-445d-b84e-60b659999d35',
    team: 'Bugsy',
    teamIsName: true,
  },
  {
    eventId: '80299fc1-3e30-466f-a146-fd45c77c84be',
    registration: '1cab5eb1-b276-417f-b213-507f981f32d0',
    team: 'NOT ASSIGNED',
  },
]

export const WIDGETS = [
  { id: 'welcome', label: 'Welcome', span: 'full' },
  { id: 'featured', label: 'Featured event', span: 'full' },
  { id: 'stats', label: 'Stats', span: 'full' },
  { id: 'upcoming', label: 'Upcoming events', span: 'half' },
  { id: 'tasks', label: 'My tasks', span: 'half' },
  { id: 'progress', label: 'My progress', span: 'half' },
  { id: 'calendar', label: 'Calendar', span: 'half' },
  { id: 'deadlines', label: 'Deadlines', span: 'half' },
  { id: 'spotlight', label: 'Spotlight', span: 'half' },
  { id: 'activity', label: 'Current activity', span: 'half' },
  { id: 'notifications', label: 'Notifications', span: 'half' },
]

export const GUIDE_SECTIONS = [
  {
    id: 'start',
    title: 'Getting started',
    body: 'Your student workspace is where CampusCode events, certificates and tools live. Start on Overview, then register for live events from Events. Joined records appear in My Events.',
  },
  {
    id: 'events',
    title: 'Events and registration',
    body: 'Open Events to browse the catalogue. Register from a card to receive a registration id and team label. Save an event if you are not ready to join. Paid events ask for an invite code — the demo code is listed under Official Communication.',
  },
  {
    id: 'ai',
    title: 'Workspace tools',
    body: 'HackMate frames a team brief. IdeaCheck scores a concept against a frontend-only scope. RuleBot answers workspace rules from this guide. These tools run in the browser.',
  },
  {
    id: 'certs',
    title: 'Certificates and digital card',
    body: 'Completed events you joined can issue a participation certificate. Preview or print it from Certificates. Your Digital Card is a local identity strip for check-in.',
  },
  {
    id: 'comms',
    title: 'Official communication',
    body: 'Announcements from CampusCode appear under Official Communication. Important notices stay pinned. Notifications are a shorter activity feed for the same account.',
  },
]

export const OFFICIAL_NOTES = [
  {
    id: 'n1',
    important: true,
    title: 'ReBuild ’26 round schedule',
    date: '7 Nov 2026',
    body: 'Round 2 is for shortlisted Round 1 submissions only. Keep your team name identical across Unstop, the portal and every file you submit.',
  },
  {
    id: 'n2',
    important: true,
    title: 'Invite codes for paid events',
    date: '6 Nov 2026',
    body: 'Students who paid on Unstop receive an invite code. For this demo the code is CC2026. Enter it when you join ReBuild ’26.',
  },
  {
    id: 'n3',
    important: false,
    title: 'Sunday 8 Nov is free',
    date: '5 Nov 2026',
    body: 'Diwali rest day. No submissions or office hours. The portal stays open for browsing.',
  },
  {
    id: 'n4',
    important: false,
    title: 'Certificate window',
    date: '4 Nov 2026',
    body: 'Participation certificates for completed quizzes appear on the Certificates page after the event is marked completed on your account.',
  },
]

export const DEFAULT_NOTIFICATIONS = [
  { id: 'nf1', title: 'ReBuild ’26 is live', body: 'Round work can be submitted until 10 PM on the listed day.', time: 'Today', unread: true },
  { id: 'nf2', title: 'Quiz result recorded', body: 'FirstCommit Quiz is marked completed on this account.', time: 'Yesterday', unread: true },
  { id: 'nf3', title: 'Digital card ready', body: 'Your identity card is available under Digital Card.', time: 'This week', unread: false },
]

export const HELP_TOPICS = [
  { q: 'How do I reset the dashboard?', a: 'Open Customize from the workspace rail. Choose Reset, or Cancel to restore the layout from when you opened the panel.' },
  { q: 'Where are my joined events?', a: 'My Events lists every event this account registered for, with a registration id and team name.' },
  { q: 'Do the tools send my writing anywhere?', a: 'No. HackMate, IdeaCheck and RuleBot run in this browser and do not call an external model.' },
  { q: 'What is the demo login?', a: 'student@gmail.com with password Student@123. New accounts you register are stored only in this browser.' },
]

export const FAQ = [
  { q: 'What is CampusCode?', a: 'A digital arena for students who build. It brings students, teams, organizers and hackathons into one connected ecosystem.' },
  { q: 'Who can register?', a: 'Students can create an account. Organizer accounts are created by the CampusCode team — write to campuscode@gmail.com.' },
  { q: 'Is this a live competition backend?', a: 'This recreation runs in the browser. Accounts, registrations and dashboard preferences stay in local storage on your machine.' },
]

export const RULES = [
  'ReBuild ’26 is individual. You still choose a team name and use that same name on Unstop, the portal and every submission.',
  'Round 1 runs Friday 6 Nov, morning to 10 PM. Round 2 is Saturday 7 Nov for shortlisted work. Sunday 8 Nov is a rest day.',
  'Paid events on Unstop (₹50) issue an invite code. Enter it when you join on CampusCode. The demo code is CC2026.',
  'Frontend work with mock data is in scope. Do not invent a production backend for the recreation.',
  'Participation certificates are issued for completed events on your account. Winner and internship awards are announced separately.',
]
