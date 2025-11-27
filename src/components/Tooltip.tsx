import { useId, type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Tooltip = ({
  labelKey,
  children,
}: {
  labelKey: string;
  children: ReactNode;
}) => {
  const { t } = useTranslation();
  const label = t(labelKey);
  const id = useId();

  useEffect(() => {
    const handleFocus = () => {
      // Clear sticky states when tab regains focus
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      const parent = document.querySelector(".footer-tooltip-parent");
      if (parent) {
        parent.dispatchEvent(new Event("mouseleave"));
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div
      className="footer-tooltip-parent"
      aria-describedby={`tooltip-${id}`}
    >
      {children}

      {/* Always render tooltip, CSS controls visibility */}
      <div id={`tooltip-${id}`} role="tooltip" className="footer-tooltip">
        {label}
      </div>
    </div>
  );
};
