import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { SectionDivider } from "../components/SectionDivider";

import profileLight from "../assets/images/profileLight.webp";
import profileDark from "../assets/images/profileDark.webp";
import profileLightMobile from "../assets/images/profileLightMobile.webp";
import profileDarkMobile from "../assets/images/profileDarkMobile.webp";

interface HomeProps {
  theme: "light" | "dark";
}

export function Home({ theme }: HomeProps) {
  const { t } = useTranslation();
  const [profileImg, setProfileImg] = useState(profileLightMobile); // default

  useEffect(() => {
    // Pick the right image based on theme and screen size
    const isMobile = window.innerWidth <= 768;
    if (theme === "dark") {
      setProfileImg(isMobile ? profileDarkMobile : profileDark);
    } else {
      setProfileImg(isMobile ? profileLightMobile : profileLight);
    }

    const handleResize = () => {
      const isMobileResize = window.innerWidth <= 768;
      if (theme === "dark") {
        setProfileImg(isMobileResize ? profileDarkMobile : profileDark);
      } else {
        setProfileImg(isMobileResize ? profileLightMobile : profileLight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="scroll-mt-20 px-6 pt-10 pb-16"
    >
      <div className=" flex flex-col md:flex-row items-center md:items-star justify-between gap-10">
      {/* Text block */}
      <div className="flex flex-col gap-4 text-center md:text-left">
      {/* Intro */}
      <h1 id="home-heading" className="text-3xl font-extrabold text-(--color-text-primary)">
        {t("sections.home.introStart")}{" "}
        <span className=" text-(--color-text-secondary) font-normal big-outline  starburst-pop inline-block ">Jerry Hernandez</span>
      </h1>
      
      {/* Hero tagline */}
      <p className="text-xl font-medium text-(--color-text-tertiary)">
        {t("sections.home.heroTagline")}
      </p>
      </div>

      {/* Profile image */}
      <img
        src={profileImg}
        alt="Jerry profile picture"
        className="rubber-hose w-80 h-80 md:w-100 md:h-100 lg:w-120 lg:h-120"
      />
      </div>

      {/* Divider at the bottom of Home section */}
      <SectionDivider className="justify-start md:justify-end gap-10 md:gap-20" primaryClass="w-[500px] md:w-[600px] lg:w-[800px]" altClass="w-[300px] md:w-[340px] lg:w-[375px]"/>
    </section>
  );
}
