interface RetroButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function RetroButton({
  text,
  onClick,
  className = "",
}: RetroButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-block px-6 py-3
        font-bold uppercase tracking-wide
        rounded-xl
        transition-all duration-150

        bg-(--color-bg-button)
        text-(--color-text-button)

        border-2 border-black
        shadow-(--retro-shadow)
        motion-press

        active:shadow-none active:translate-x-1 active:translate-y-1

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#d2ad4b]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-(--color-bg-navbarAndFooter)

        ${className}
      `}
    >
      {text}
    </button>
  );
}
