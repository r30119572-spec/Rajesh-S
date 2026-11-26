export function ToolLogo({ id }: { id: string }) {
  switch (id) {
    case 'gsc':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path d="M12 27V19M18 27V13M24 27V17M30 27V11" stroke="#4285F4" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="29" cy="12" r="3" fill="#FF2525" />
        </svg>
      );
    case 'ga4':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <rect x="24" y="10" width="5" height="20" rx="2.5" fill="#F9AB00" />
          <rect x="17" y="16" width="5" height="14" rx="2.5" fill="#E37400" />
          <circle cx="12.5" cy="27.5" r="2.7" fill="#E37400" />
        </svg>
      );
    case 'keyword-planner':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <circle cx="18" cy="18" r="6.5" fill="none" stroke="#34A853" strokeWidth="2.8" />
          <path d="M23 23L29 29" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 14.5V21.5M14.5 18H21.5" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'gtm':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path d="M20 9L11 18L20 27L29 18L20 9Z" fill="none" stroke="#4285F4" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M16 20L20 24L24 20" stroke="#8AB4F8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="30" r="2.2" fill="#4285F4" />
        </svg>
      );
    case 'meta-suite':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path
            d="M11 23C11 18 14 14 16.8 14C19.2 14 20.6 17.4 22 20C23.4 22.6 24.8 26 27.2 26C29.5 26 31 23.8 31 21C31 16.5 28 14 25.5 14C22.8 14 21 17.5 19.5 20.5C18 23.5 16.2 26 13.8 26C12 26 11 24.7 11 23Z"
            fill="none"
            stroke="#0668E1"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'semrush':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <circle cx="20" cy="20" r="8" fill="#FF642D" />
          <path d="M12 20C15 16 22 15 28 19C25 23 19 24 12 20Z" fill="#080808" />
          <circle cx="23.5" cy="19.5" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'ahrefs':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path
            d="M20 10L11.5 29H15.8L17.6 24.6H22.4L24.2 29H28.5L20 10ZM18.8 21.4L20 18.2L21.2 21.4H18.8Z"
            fill="#FF7A00"
          />
        </svg>
      );
    case 'bulk-da-pa':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <rect x="11" y="13" width="18" height="4" rx="1.5" fill="#FF2525" />
          <rect x="11" y="19" width="14" height="4" rx="1.5" fill="#FFFFFF" />
          <rect x="11" y="25" width="10" height="4" rx="1.5" fill="#A1A1AA" />
        </svg>
      );
    case 'grammarly':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <circle cx="20" cy="20" r="9.5" fill="#15C39A" />
          <path
            d="M24.2 17.6C23.2 15.8 21.3 14.8 19.3 15.1C16.8 15.4 15 17.5 15 20C15 22.7 17.2 24.8 20 24.8C22.2 24.8 24 23.4 24.6 21.4H20.6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'title-rephrase':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path d="M12 14H28M20 14V27" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
          <path
            d="M26 22.5C27.5 22.5 28.5 23.6 28.5 25C28.5 26.4 27.5 27.5 26 27.5H23"
            fill="none"
            stroke="#FF2525"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'duplicate-checker':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <rect x="11" y="13" width="12" height="14" rx="2" fill="none" stroke="#A1A1AA" strokeWidth="2.2" />
          <rect x="17" y="10" width="12" height="14" rx="2" fill="#18181B" stroke="#FF2525" strokeWidth="2.2" />
          <path d="M20.5 17L22.5 19L26 15.2" fill="none" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'claude':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <g stroke="#D97757" strokeWidth="2.3" strokeLinecap="round">
            <line x1="20" y1="9.5" x2="20" y2="30.5" />
            <line x1="9.5" y1="20" x2="30.5" y2="20" />
            <line x1="12.6" y1="12.6" x2="27.4" y2="27.4" />
            <line x1="27.4" y1="12.6" x2="12.6" y2="27.4" />
          </g>
        </svg>
      );
    case 'zerogpt':
    default:
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" fill="#18181B" stroke="#27272A" />
          <path
            d="M14 13H26L14 27H26"
            fill="none"
            stroke="#FF2525"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
