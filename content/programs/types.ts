export type StoryStage = {
  eyebrow: string;
  title: string;
  body: string;
};

export type StoryCard = {
  title: string;
  body: string;
};

export type ProgramVideo = {
  title: string;
  shortTitle: string;
  invitation: string;
  vimeoId: string;
  vimeoHash: string;
  thumbnail: string;
};

export type ProgramMetric = {
  value: string;
  body: string;
  note?: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
};

export type JourneyStop = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

/** Copy and asset paths for one program page. Fill every field before the page is built. */
export type ProgramCopy = {
  title: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroBackground: string;
  heroLogo: string;
  heroFigures: string;
  heroFiguresAlt: string;
  characterStates: { src: string; alt: string }[];
  voiceWelcome: string;
  basics: StoryCard[];
  stages: StoryStage[];
  visitIntro: string;
  skills: StoryCard[];
  show: StoryCard[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryLead: string;
  videos: ProgramVideo[];
  proofTitle: string;
  metrics: ProgramMetric[];
  testimonials: Testimonial[];
  journeyEyebrow: string;
  journeyTitle: string;
  journeyLead: string;
  journey: JourneyStop[];
  keepsake: JourneyStop;
};
