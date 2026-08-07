import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "abtalks-theme";

export const themeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s?s==="dark":m;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setIsDark(next);
  }, []);

  return { isDark, toggle };
}
