import { User } from "../utils/types";
import { useState } from "react";

export default function Paginate({ previousScores }: User) {
  const [page, setPage] = useState(1);
  const [previousScoresPerPage] = useState(5);
  const indexOfLastScore = page * previousScoresPerPage;
  const indexOfFirstScore = indexOfLastScore - previousScoresPerPage;
  const currentScores = previousScores?.slice(
    indexOfFirstScore,
    indexOfLastScore
  );
  const pages = previousScores
    ? Math.ceil(previousScores.length / previousScoresPerPage)
    : null;
  const pagesArr = Array.from({ length: pages || 0 }, (_, i) => i + 1);

  return (
    <>
      <div
        className="text-md text-blue-400 font-bold cursor-pointer font-mono px-6 py-2 rounded-lg underline-offset-8 hover:underline"
        onClick={() => {
          window.location.reload();
        }}
      >
        Click here to refresh the score
      </div>
      {previousScores && previousScores.length > 0 ? (
        <div className="max-w-none mx-auto">
          <div className="bg-gray-300 dark:bg-[#15181a] overflow-hidden shadow sm:rounded-lg">
            <ul className="divide-y divide-gray-300 dark:divide-[#15181a]">
              {currentScores
                ?.sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                ?.map((score, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="block hover:bg-gray-50 dark:hover:bg-[#0f1113]"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="mt-2 flex justify-between">
                          <div className="sm:flex">
                            <div className="mr-6 flex items-center justify-center text-md text-gray-800 dark:text-gray-300">
                              <svg
                                className="flex-shrink-0 mr-1.5 fill-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                              >
                                <path d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" />
                              </svg>
                              {new Date(score.date).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",

                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              })}
                            </div>
                          </div>
                          <div className="flex items-center justify-center text-md font-bold text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-[#0e1011] w-[35px] h-[35px] rounded-full">
                            {score.score}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
            <div className="bg-gray-300 dark:bg-[#15181a] px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-[#0e1011] sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a
                  onClick={() => {
                    setPage(page !== 1 ? page - 1 : 1);
                  }}
                  className={
                    (page === 1 ? "cursor-not-allowed opacity-60" : "") +
                    " relative inline-flex items-center px-2 py-2 rounded-lg border border-gray-300 dark:border-[#15181a] text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0f1113] hover:bg-gray-200 dark:hover:bg-[#1a1e20] text-sm font-medium"
                  }
                  href="#"
                >
                  Previous
                </a>
                <span className="inline-flex items-center px-2 py-2 rounded-lg text-gray-900 dark:text-white text-sm font-medium">
                  page {page} of {pages}
                </span>
                <a
                  onClick={() => {
                    setPage(page !== pages ? page + 1 : pages);
                  }}
                  className={
                    (page === pages ? "cursor-not-allowed opacity-60" : "") +
                    " ml-3 relative inline-flex items-center px-2 py-2 rounded-lg border border-gray-300 dark:border-[#15181a] text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0f1113] hover:bg-gray-200 dark:hover:bg-[#1a1e20] text-sm font-medium"
                  }
                  href="#"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Showing <b>{currentScores?.length}</b>{" "}
                    {currentScores?.length === 1 ? "score" : "scores"} out of{" "}
                    <b>{previousScores?.length}</b>{" "}
                    {previousScores?.length === 1 ? "score" : "scores"} on page{" "}
                    <b>{page}</b> of <b>{pages}</b> pages
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      onClick={() => {
                        setPage(1);
                      }}
                      className={
                        (page === 1 ? "cursor-not-allowed opacity-60" : "") +
                        " relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-[#15181a] text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0f1113] hover:bg-gray-200 dark:hover:bg-[#1a1e20] text-sm font-medium"
                      }
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        x-description="Heroicon name: solid/chevron-left"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                    {pagesArr?.map((score, i) => (
                      <a
                        onClick={() => setPage(score)}
                        key={i}
                        href="#"
                        className={
                          (page === i + 1
                            ? "cursor-not-allowed opacity-60"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50") +
                          " relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 dark:border-[#15181a] text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0f1113] hover:bg-gray-200 dark:hover:bg-[#1a1e20] text-sm font-medium"
                        }
                      >
                        {i + 1}
                      </a>
                    ))}

                    <a
                      href="#"
                      onClick={() => setPage(pagesArr?.length)}
                      className={
                        (page === pagesArr?.length
                          ? "cursor-not-allowed opacity-60"
                          : "") +
                        "dark:border-[#15181a] text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0f1113] hover:bg-gray-200 dark:hover:bg-[#1a1e20] relative inline-flex items-center px-2 py-2 rounded-r-md"
                      }
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        x-description="Heroicon name: solid/chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-md text-white font-mono px-6 py-2 rounded-lg">
          You have 0 recorded scores.
        </div>
      )}
    </>
  );
}
