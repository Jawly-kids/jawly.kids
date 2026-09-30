type IconProps = { className?: string };

const common = {
  viewBox: "0 0 160 130",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
} as const;

export function TrustedPeopleIcon({ className }: IconProps) {
  return <svg {...common} className={className}>
    <path d="M29 83c9-12 22-18 37-18 17 0 31 7 40 21 8 12 9 25 5 37H25c-3-14-2-28 4-40Z" fill="#F7D45D"/>
    <circle cx="65" cy="43" r="22" fill="#F8ECE8" stroke="currentColor" strokeWidth="3"/>
    <path d="M49 43c5-4 10-6 16-6 7 0 13 2 18 7M56 51c5 4 12 4 17 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M22 111c2-22 19-38 43-38 23 0 41 16 43 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="m113 34 7 6 13-15" stroke="#B54132" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M105 20c9-7 23-7 32 1 10 8 12 24 4 35-5 7-14 12-23 15-10-4-18-9-22-17-6-12-2-26 9-34Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
  </svg>;
}

export function PrivateSystemIcon({ className }: IconProps) {
  return <svg {...common} className={className}>
    <path d="M21 34c20-17 50-22 74-11 25 11 41 37 36 64-5 25-25 42-49 42-26 0-50-17-61-40-10-21-10-41 0-55Z" fill="#E8F0FA"/>
    <ellipse cx="80" cy="37" rx="35" ry="13" fill="#FFFDF9" stroke="currentColor" strokeWidth="3"/>
    <path d="M45 37v45c0 7 16 13 35 13s35-6 35-13V37M45 59c0 7 16 13 35 13s35-6 35-13" stroke="currentColor" strokeWidth="3"/>
    <rect x="88" y="67" width="47" height="42" rx="10" fill="#F8ECE8" stroke="currentColor" strokeWidth="3"/>
    <path d="M99 67v-8c0-9 6-16 13-16s13 7 13 16v8M112 84v9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="112" cy="83" r="3" fill="#B54132"/>
  </svg>;
}

export function PreparedExperienceIcon({ className }: IconProps) {
  return <svg {...common} className={className}>
    <path d="M32 22h82c8 0 14 6 14 14v73H46c-8 0-14-6-14-14V22Z" fill="#F8ECE8"/>
    <path d="M40 18h70c8 0 14 6 14 14v73H40c-7 0-12-5-12-12V30c0-7 5-12 12-12Z" fill="#FFFDF9" stroke="currentColor" strokeWidth="3"/>
    <path d="M28 88c0-7 5-12 12-12h84M48 40h42M48 53h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="m91 54 5 11 12 2-9 8 2 12-10-6-11 6 3-12-9-8 12-2 5-11Z" fill="#F7D45D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="m118 17 2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8Z" fill="#B54132"/>
  </svg>;
}
