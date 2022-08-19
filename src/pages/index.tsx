import LoadingComponent from "../components/Loading";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import type { NextPage } from "next";
import type { IndexProps } from "../utils/types";
import {
  questionAtom,
  loadingAtom,
  stepAtom,
  selectedOptionAtom,
  validationAtom,
} from "../utils/atoms";
import { useAtom } from "jotai";
import { AxiosInstance, notify } from "../utils/helpers";

const Home: NextPage<IndexProps> = (props: IndexProps) => {
  const [question, setQuestion] = useAtom(questionAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [validating, setValidating] = useAtom(validationAtom);

  function fetchQuestion(timeout: number) {
    setLoading(true);
    setTimeout(() => {
      AxiosInstance.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/questions/random"
      )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.error) {
              return notify(res.data.error, null, "error");
            }
            const question = res.data.question;
            setQuestion(question);
            setLoading(false);
          } else {
            setQuestion({
              id: "",
              question: "",
              options: [],
            });
            setLoading(false);
          }
        })
        .catch(() => {
          setQuestion({
            id: "",
            question: "",
            options: [],
          });
          setLoading(false);
        });
    }, timeout);
  }

  const validateAnswer = (answer: string, id: string) => {
    setValidating(true);

    AxiosInstance.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/questions/validate",
      {
        questionId: id,
        answer: answer,
        score: step,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.error) {
            setValidating(false);
            return notify(res.data.error, null, "error");
          }
          const response = res.data.valid;
          if (!response) {
            setStep(0);
            setSelectedOption("");
            setValidating(false);
            setLoading(false);
            setQuestion(null);
            const parentEl: HTMLElement | null =
              document.getElementById("main_el");
            if (parentEl) {
              parentEl.classList.remove(
                "select-none",
                "cursor-default",
                "hidden"
              );
              parentEl.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }

            return notify(
              "Wrong answer, better luck next time!",
              20000,
              "statistics",
              {
                score: step,
                correctAnswer: question?.options.find((o) => o?.isCorrect)
                  ?.label,
                answer: question?.options.find((o) => o?.value === answer)
                  ?.label,
                question: question?.question,
              }
            );
          } else notify("That's correct!", 2000, "success");

          setValidating(false);
          setStep(step + 1);
          setSelectedOption("");
          setQuestion(null);
          fetchQuestion(500);
        } else {
          setValidating(false);
          setQuestion({
            id: "",
            question: "",
            options: [],
          });
        }
      })
      .catch(() => {
        setQuestion({
          id: "",
          question: "",
          options: [],
        });
        setValidating(false);
      });
  };

  function startGame() {
    const parentEl: HTMLElement | null = document.getElementById("main_el");
    if (parentEl) {
      parentEl.classList.add("select-none", "cursor-default", "hidden");
      fetchQuestion(200);
    }
  }

  return (
    <>
      <div className="h-screen" id="main_el">
        <header className="flex flex-col items-center lg:pt-20 md:pt-16 pt-4">
          <div className="flex justify-center">
            <h1
              className="dark:text-white text-gray-900 font-bold text-5xl uppercase dark:drop-shadow-[0_0_25px_#000] drop-shadow-[0_0_25px_#fff]"
              style={{
                fontFamily:
                  'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              QUIZ APP
            </h1>
            <Tippy
              content={"Toggle Theme"}
              animation="scale"
              className="shadow-xl"
            >
              <button
                type="button"
                className="ml-3 text-gray-500 dark:text-gray-400 hover:bg-gray-300 hover:dark:bg-[#15181a] focus:outline-none ring-4 ring-gray-300 dark:ring-[#15181a] rounded-lg text-sm p-2.5"
              >
                {props.theme === "dark" ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 fill-black dark:fill-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      localStorage.setItem("theme", "light");
                      document.documentElement.classList.add("dark");
                      props.setTheme("light");
                    }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 fill-black dark:fill-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      props.setTheme("dark");
                      document.documentElement.classList.remove("dark");
                      localStorage.setItem("theme", "dark");
                    }}
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                  </svg>
                )}
              </button>
            </Tippy>
          </div>
          {props?.user ? (
            <p className="text-black dark:text-white font-bold text-md font-mono mt-2">
              Welcome {props.user.username}.{" "}
              <Link href={process.env.NEXT_PUBLIC_API_URL + "/api/user/logout"}>
                <a className="opacity-60 hover:opacity-100">Logout</a>
              </Link>{" "}
              |{" "}
              <Link href="/profile">
                <a className="opacity-60 hover:opacity-100">Profile</a>
              </Link>
            </p>
          ) : (
            ""
          )}
        </header>
        <div className="flex lg:justify-center h-3/5 mt-8" id="file">
          <div className="flex justify-center items-center px-6 lg:px-0 w-full lg:w-1/4">
            <div className="w-full space-y-6">
              {props.user ? (
                <div
                  onClick={startGame}
                  className="flex items-center justify-center cursor-pointer select-none button--moema px-5 py-6 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    className="mr-2 fill-black dark:fill-white"
                  >
                    <path d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Z" />
                  </svg>
                  Play as
                  <b className={"ml-1 text-gray-900 dark:text-gray-400"}>
                    {props?.user?.username}
                  </b>
                </div>
              ) : (
                <Link href="/profile">
                  <div className="flex items-center justify-center cursor-pointer select-none button--moema px-5 py-6 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      className="mr-2 fill-black dark:fill-white"
                    >
                      <path d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Z" />
                    </svg>
                    Play as User
                  </div>
                </Link>
              )}
              <div
                onClick={startGame}
                className="flex items-center justify-center cursor-pointer select-none button--moema px-5 py-6 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  className="mr-2 fill-black dark:fill-white"
                >
                  <path d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Z" />
                </svg>
                Play as Guest
              </div>
            </div>
          </div>
        </div>

        <div className="lg:landscape:flex md:landscape:flex landscape:hidden animate__animated animate__fadeIn animate__delay-1s flex justify-center items-center absolute bottom-8 right-0 left-0">
          <div className="px-4 py-2 bg-gray-300 dark:bg-[#15181a] text-slate-800 dark:text-white font-bold flex items-center rounded-md">
            Made by{" "}
            <a
              className="hover:transition-all duration-200 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-bold px-1"
              href="https://github.com/peterhanania"
              target="_blank"
              rel="noreferrer"
            >
              github.com/peterhanania
            </a>
          </div>
        </div>
      </div>

      {loading || question ? (
        <div className="h-screen animate__animated animate__fadeIn">
          {!loading && question && question.id !== "" ? (
            <>
              <header className="flex flex-col items-center lg:pt-20 md:pt-16 pt-4">
                <h1
                  className="space-y-4 dark:text-white text-gray-900 font-bold lg:text-5xl md:text-3xl sm:text-2xl text-xl uppercase dark:drop-shadow-[0_0_25px_#000] drop-shadow-[0_0_25px_#fff]"
                  style={{
                    fontFamily:
                      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  Question #{step + 1}
                </h1>
              </header>
              <div className="flex lg:justify-center h-3/5 mt-8" id="file">
                <div className="flex justify-center items-center px-6 lg:px-0 w-full ">
                  <div className="w-full lg:w-1/4 space-y-6">
                    <div className="border-l-4 p-4 dark:border-[#181B1D] dark:bg-[#2c3135] border-[#acb0b5] bg-[#D1D5DB]">
                      <span
                        className="text-gray-900 dark:text-white font-bold text-xl h-full font-mono"
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      ></span>
                    </div>
                    <div className="pt-6 pb-2">
                      <>
                        {question.options.map(
                          (option: {
                            label: string;
                            value: string;
                            isCorrect: boolean;
                          }) => (
                            <div
                              onClick={() => {
                                if (!validating) {
                                  setSelectedOption(option.value);
                                  const e = document.getElementById(
                                    option.value
                                  ) as HTMLInputElement;
                                  if (e) {
                                    e.checked = true;
                                  }
                                }
                              }}
                              className={
                                (validating
                                  ? "opacity-80 cursor-not-allowed"
                                  : "opacity-80 hover:opacity-100 cursor-pointer") +
                                " bg-gray-300 dark:bg-[#15181a] min-h-[50px] py-2 w-auto mb-4 rounded-md flex items-center"
                              }
                              key={option.value}
                            >
                              <input
                                type="radio"
                                name="answer"
                                className="ml-5 dark:bg-gray-800 cursor-pointer "
                                id={option.value}
                              />
                              <label
                                className={
                                  (validating
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer") +
                                  " text-gray-900 dark:text-gray-200 text-lg ml-4 cursor-pointer max-w-[85%] select-none"
                                }
                                htmlFor={option.value}
                                dangerouslySetInnerHTML={{
                                  __html: option.label,
                                }}
                              ></label>
                            </div>
                          )
                        )}
                      </>
                      <div className="flex items-center justify-center mt-6">
                        {!validating ? (
                          <button
                            onClick={() => {
                              setValidating(true);
                              if (selectedOption === "") {
                                setValidating(false);
                                return notify(
                                  "Please pick one the options above!",
                                  2000,
                                  "error"
                                );
                              }

                              validateAnswer(selectedOption, question.id);
                            }}
                            className="flex items-center justify-center px-6 py-2 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest"
                          >
                            Submit
                          </button>
                        ) : (
                          <button className="opacity-70 cursor-not-allowed flex items-center justify-center px-6 py-2 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest">
                            <svg
                              className="mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              style={{
                                background: "none",
                                display: "block",
                                shapeRendering: "auto",
                              }}
                              width="21px"
                              height="21px"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="xMidYMid"
                            >
                              <circle
                                cx={50}
                                cy={50}
                                fill="none"
                                stroke="#504f4f"
                                strokeWidth={10}
                                r={35}
                                strokeDasharray="164.93361431346415 56.97787143782138"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="rotate"
                                  repeatCount="indefinite"
                                  dur="1s"
                                  values="0 50 50;360 50 50"
                                  keyTimes="0;1"
                                />
                              </circle>
                            </svg>
                            Validating
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {question && question.id === "" ? (
                <div className="h-screen flex justify-center items-center">
                  <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 lg:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
                    <div className="w-full">
                      <h1 className="py-4 text-4xl lg:text-6xl md:text-6xl font-extrabold dark:text-white text-gray-800 max-w-lg">
                        Error sending request
                      </h1>
                      <p className="pb-8 text-2xl dark:text-white text-gray-800 max-w-lg">
                        Heya user, it looks like there was an error sending the
                        request. This could have happened if you do not have a
                        stable internet connection or our API server might be
                        down. Please try again later!
                      </p>
                      <button
                        onClick={() => {
                          setSelectedOption("");
                          setQuestion(null);
                          fetchQuestion(200);
                        }}
                        className="flex items-center justify-center px-6 py-2 bg-gray-300 dark:bg-[#15181a] hover:bg-gray-400 dark:hover:bg-[#0f1113] hover:text-white text-gray-900 dark:text-gray-300 relative focus:outline-none rounded-lg text-sm text-center font-semibold uppercase tracking-widest"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <LoadingComponent />
              )}
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
