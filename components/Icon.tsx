const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5 11 13" />
      <path d="M17 13.5V19H5V7h5.5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  minus: <path d="M6 12h12" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  scope: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </>
  ),
  // Product rail (drawn to match the product's navigation icons)
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
      <rect x="3.5" y="15.5" width="7" height="5" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3 20c.8-3.2 3.2-5 6-5s5.2 1.8 6 5" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 15c1.4.6 2.4 2.3 2.5 5" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.5 13.5 6 5h12l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" />
      <path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" />
    </>
  ),
  messages: (
    <>
      <path d="M14 9.5h4.5a2 2 0 0 1 2 2V20l-3-2.5H12a2 2 0 0 1-2-2V15" />
      <path d="M3.5 5.5a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2V11a2 2 0 0 1-2 2H7.5l-4 3z" />
    </>
  ),
  tasks: (
    <>
      <path d="m3.5 6 1.5 1.5L8 4.5M3.5 13l1.5 1.5L8 11.5" />
      <path d="M11 6h9.5M11 13h9.5M11 19.5h9.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20.5h16" />
      <path d="M7 16.5v-5M12 16.5v-9M17 16.5V13" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M6 18l1.8-1.8M16.2 7.8 18 6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
