export function SectionDivider() {
  return (
    <div className="flex flex-row w-150 max-w-full gap-6 items-center justify-center mt-8">
      {/* Main divider */}
      <div className="section-divider">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Alternate divider */}
      <div className="section-divider-alt">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}