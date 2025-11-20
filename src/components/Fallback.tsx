import { useTranslation } from "react-i18next";

export function Fallback() {
  const { t } = useTranslation();
  return <div>{t("fallback.description")}</div>;
}
