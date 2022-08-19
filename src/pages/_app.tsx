import "animate.css";
import "../utils/styles/index.css";
import { AppProps } from "next/app";
import { progressAtom } from "../utils/atoms";
import { useAtom } from "jotai";
import { themeAtom, userAtom } from "../utils/atoms";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import Statistics from "../components/statistics";

declare module "notistack" {
  // eslint-disable-next-line no-unused-vars
  interface VariantOverrides {
    statistics: true;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useAtom(progressAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/user/status", {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.status === 200 && response?.data?.user) {
          setUser({
            username: response.data.user.username,
            previousScores: response.data.user.previousScores,
          });
        }
      })
      .catch(() => {});
  }, [setUser]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
      setTheme("light");
    } else if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("light");
    }
  }, [setTheme]);

  return (
    <>
      <SnackbarProvider
        Components={{
          statistics: Statistics,
        }}
      >
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(100)}
        />
        <Component
          {...pageProps}
          theme={theme}
          setTheme={setTheme}
          user={user}
        />
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
