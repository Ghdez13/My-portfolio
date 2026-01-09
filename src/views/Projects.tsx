import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import { SectionDivider } from "../components/SectionDivider";
import { projects } from "../data/projects";
import { FilmTape } from "../projects/FilmTape";
import { Projector } from "../projects/Projector";
import { ProjectReview } from "../projects/ProjectReview";
import { motion } from "framer-motion";
import {
  projectsSectionVariant,
  projectsTitleVariant,
  projectLeftVariant,
  projectRightVariant,
  projectTapeVariant,
} from "../animations/retroAnimations";

export function Projects() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = projects[currentIndex];

  //Defensive guard (prevents runtime crashes)
  if (!currentProject) {
    return null;
  }

  const currentImage =
    theme === "dark" ? currentProject.images.dark : currentProject.images.light;

  return (
    <motion.section
      id="projects"
      className="scroll-mt-20 px-6 py-[5vh] min-h-[60vh] md:min-h-[70vh]"
      variants={projectsSectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h1
        className="text-6xl lg:text-8xl font-extrabold text-(--color-text-primary) mb-10"
        variants={projectsTitleVariant}
      >
        {t("sections.projects.title", "Projects")}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <motion.div className="w-full lg:w-1/2" variants={projectLeftVariant}>
          <ProjectReview project={currentProject} />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          variants={projectRightVariant}
        >
          <Projector imageSrc={currentImage} />
        </motion.div>
      </div>

      <motion.div className="mt-16" variants={projectTapeVariant}>
        <FilmTape
          projects={projects}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />
      </motion.div>

      <div className="w-full xl:mt-15 ">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[500px] md:w-[600px] lg:w-[800px]"
          altClass="w-[300px] md:w-[340px] lg:w-[375px]"
        />
      </div>
    </motion.section>
  );
}
