export function TelegramIcon({ className = 'size-4 shrink-0' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        fill="var(--background)"
        d="M5.491 11.74 17.061 7.279c.537-.194 1.006.131.832.943l-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.02 5.569-5.031c.242-.213-.054-.334-.373-.121L8.365 15.12l-2.907-.916c-.631-.203-.645-.631.135-.943z"
      />
    </svg>
  );
}
