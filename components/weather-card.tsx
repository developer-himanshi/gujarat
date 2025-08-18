export default function WeatherCard() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        {/* Weather Icon Placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-primary"
        >
          <path d="M12 2.93a10 10 0 0 0-9.37 10.67 1 1 0 0 0 .92.8A9.94 9.94 0 0 0 12 4.93a9.94 9.94 0 0 0 8.45 9.4.99.99 0 0 0 .92-.8A10 10 0 0 0 12 2.93z"></path>
          <path d="M12 13a1 1 0 0 0-.3-.07 1 1 0 0 0-.41.14 1 1 0 0 0-.29.78v.01a1 1 0 0 0 .29.78 1 1 0 0 0 .41.14 1 1 0 0 0 .3-.07v-.01a1 1 0 0 0 .3-.07 1 1 0 0 0 .41-.14 1 1 0 0 0 .29-.78v-.01a1 1 0 0 0-.29-.78 1 1 0 0 0-.41-.14 1 1 0 0 0-.3-.07z"></path>
        </svg>
      </div>
      <div className="text-3xl font-bold text-primary">25°C</div>
      <div className="text-sm text-muted-foreground">Sunny</div>
    </div>
  )
}
