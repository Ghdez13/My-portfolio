import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const MENU_ITEMS = [
    { id: "home", path: "#home", label: "navbar.home" },
    { id: "about", path: "#about", label: "navbar.about" },
    { id: "experience", path: "#experience", label: "navbar.experience" },
    { id: "technologies", path: "#technologies", label: "navbar.technologies" },
    { id: "project", path: "#project", label: "navbar.project" },
    { id: "contact", path: "#contact", label: "navbar.contact" },
  ] as const;

  // Language options for your switcher and names for toast messages or UI labels
  const LANGUAGES = [
    { code: "es", label: "ES", name: "Español" },
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
  ] as const;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle outside click, touch, and Escape key
  useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (!modalRef.current) return;
      if (toggleButtonRef.current?.contains(event.target as Node)) return;
      if (!modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" aria-label={t("aria.logo")}>
          <img
            src="/logo/logo.webp"
            alt="Jerry.dev logo"
            className="h-8 w-auto sm:h-10 transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6" aria-label={t("aria.mainNav")}>
          {MENU_ITEMS.map(({ id, path, label }) => (
            <a
              key={id}
              href={path}
              aria-label={t(`navbar.alt.${id}`)}
              className="hover:underline"
            >
              {t(label)}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleButtonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 focus:outline-none relative w-6 h-6 z-60"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-black transition-transform duration-300 ease-in-out hover:scale-105
 ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
          />
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-black transition-transform duration-300 ease-in-out hover:scale-105
 ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
          />
        </button>

        {/* Desktop language selector */}
        <div
          className="hidden md:flex items-center gap-3"
          aria-label={t("aria.languageSwitcher")}
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={async () => {
                await i18n.changeLanguage(code);
                localStorage.setItem("preferredLanguage", code);

                const activationMessages: Record<string, string> = {
                  es: "Español activado",
                  fr: "Français activé",
                  en: "English activated",
                };

                toast.success(activationMessages[code]);
              }}
              className={`relative inline-block text-sm font-semibold transition hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-500 after:w-0 after:transition-all after:duration-300 ${
                i18n.language === code
                  ? "after:w-full text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu modal */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          aria-label={t("aria.menuToggle")}
        >
          {/* Backdrop */}
          <div className="flex-1 bg-black/50" />

          {/* Drawer */}
          <div
            ref={modalRef}
            className="w-2/3 max-w-sm bg-white h-full shadow-lg p-6 flex flex-col gap-6 text-lg relative"
          >
            {/* Menu items */}
            {MENU_ITEMS.map(({ id, path, label }) => (
              <a
                key={id}
                href={path}
                onClick={() => setIsOpen(false)}
                aria-label={t(`navbar.alt.${id}`)}
                className="hover:underline"
              >
                {t(label)}
              </a>
            ))}

            {/* Mobile language selector */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={async () => {
                    await i18n.changeLanguage(code);
                    localStorage.setItem("preferredLanguage", code);

                    const activationMessages: Record<string, string> = {
                      es: "Español activado",
                      fr: "Français activé",
                      en: "English activated",
                    };

                    toast.success(activationMessages[code]);

                    setIsOpen?.(false);
                  }}
                  className={`relative inline-block font-semibold transition hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-500 after:w-0 after:transition-all after:duration-300 ${
                    i18n.language === code
                      ? "after:w-full text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
