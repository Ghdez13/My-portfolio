import { useTranslation } from "react-i18next";
import { SectionDivider } from "../components/SectionDivider";
import aboutMeLight from "../assets/images/aboutMeLight.webp";
import aboutMeDark from "../assets/images/aboutMeDark.webp";
import { useTheme } from "../components/ThemeContext";
import { motion } from "framer-motion";
import {
  sectionVariant,
  titleVariant,
  itemVariant,
} from "../animations/retroAnimations";

export function About() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";
  const description = t("sections.about.description", {
    returnObjects: true,
  }) as string[];

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-6 py-[5vh] min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center md:items-start"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section title*/}
      <motion.h1
        id="about-heading"
        tabIndex={-1}
        className="w-full text-center text-(--color-text-primary) mb-10 font-extrabold text-6xl lg:text-8xl"
        variants={titleVariant}
      >
        {t("sections.about.aboutTitle", "About Me")}
      </motion.h1>

      {/* Content container → text + image only */}
      <div className="w-full md:grid md:grid-cols-2 md:gap-10 items-center">
        {/* Text: greeting + paragraphs */}
        <motion.div
          className="order-1 md:order-2 flex flex-col justify-center"
          variants={itemVariant}
        >
          <h2 className="text-4xl lg:text-6xl text-start text-(--color-text-secondary) big-outline md:text-start mb-6 font-bold starburst-pop">
            {t("sections.about.greeting", "Hello...")}
          </h2>

          {description.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={itemVariant}
              className="text-2xl text-(--color-text-tertiary) leading-relaxed max-w-xl mx-auto md:mx-0 mb-5"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Image */}
        <motion.picture
          className="order-2 md:order-1 flex justify-center"
          variants={itemVariant}
        >
          <source
            media="(min-width: 768px)"
            srcSet={isDark ? aboutMeDark : aboutMeLight}
            type="image/webp"
          />
          <source
            media="(max-width: 767px)"
            srcSet={isDark ? aboutMeDark : aboutMeLight}
            type="image/webp"
          />
          <img
            src={theme === "dark" ? aboutMeDark : aboutMeLight}
            alt={t("sections.about.profileAlt", "Jerry’s avatar")}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="scale-interactive object-contain w-full max-w-[300px] md:max-w-[400px]"
          />
        </motion.picture>
      </div>

      {/* Divider */}
      <div className="w-full xl:mt-15 ">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[300px] md:w-[340px] lg:w-[375px]"
          altClass="w-[500px] md:w-[600px] lg:w-[800px]"
        />
      </div>
    </motion.section>
  );
}
