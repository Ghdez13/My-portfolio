import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTheme } from "../components/ThemeContext";
import { useTranslation } from "react-i18next";
import type { Project } from "../data/projects";
import { useMemo } from "react";
import FilmLight from "../assets/images/filmLight.webp";
import FilmDark from "../assets/images/filmDark.webp";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProjectCarousel.css";

type ProjectCarouselProps = {
  projects: Project[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectCarousel({
  projects,
  currentIndex,
  onSelect,
}: ProjectCarouselProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Desktop shows max 3 slides
  const hasHiddenSlidesDesktop = useMemo(
    () => projects.length > 3,
    [projects.length]
  );

  return (
    <div className="mx-auto max-w-full relative">
      {/* Decorative image */}
      <img
        src={theme === "dark" ? FilmDark : FilmLight}
        alt={t("sections.projects.imageAlt", "Filmtape Projects decorative")}
        className="absolute -top-6 lg:-top-10 w-32 h-32 lg:w-42 lg:h-42  select-none scale-interactive "
      />

      {/* Swiper container */}
      <div className="rounded-2xl px-4 pt-4 pb-6">
        <Swiper
          modules={[Navigation, Pagination]}
          loop={projects.length > 1}
          grabCursor
          slidesPerView={1}
          spaceBetween={16}
          /* Pagination ALWAYS on mobile */
          pagination={{
            clickable: true,
            enabled: projects.length > 1,
          }}
          /* Navigation ONLY when desktop actually hides slides */
          navigation={hasHiddenSlidesDesktop}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full mt-16 lg:mt-24"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                onTouchStart={(e) => e.stopPropagation()}
                className="
                  w-full aspect-video rounded-[10px]
                  cursor-pointer
                  focus:outline-none
                  flex items-start justify-start
                "
              >
                <div
                  className={`
                    w-full h-full overflow-hidden rounded-[10px]
                    transition-[transform,opacity] duration-200
                    ${
                      index === currentIndex
                        ? "opacity-100 scale-[0.6] ring-4"
                        : "opacity-50 scale-[0.5]"
                    }
                  `}
                >
                  <img
                    src={
                      theme === "dark"
                        ? project.images.dark
                        : project.images.light
                    }
                    alt={project.title}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
