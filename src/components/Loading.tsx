import type { NextPage } from "next";
import Skeleton from "../utils/styles/modules/skeleton.module.css";

const LoadingComponent: NextPage = () => {
  return (
    <div className="h-screen animate__animated animate__fadeIn ">
      <header className="flex flex-col items-center lg:pt-20 md:pt-16 pt-4">
        <div
          className={
            Skeleton.loading +
            " lg:w-[310.5px] lg:h-[48px] w-[194px] h-[36px] space-y-4"
          }
        ></div>
      </header>
      <div className="flex lg:justify-center h-3/5 mt-8" id="file">
        <div className="flex justify-center items-center px-6 lg:px-0 w-full ">
          <div className="w-full lg:w-1/4 space-y-6">
            <div className={Skeleton.loading + " h-[60px]"}></div>
            <div className="pt-6 pb-2">
              <div
                className={
                  Skeleton.loading + " h-[50px] py-2 w-auto mb-4 rounded-md"
                }
              ></div>{" "}
              <div
                className={
                  Skeleton.loading + " h-[50px] py-2 w-auto mb-4 rounded-md"
                }
              ></div>{" "}
              <div
                className={
                  Skeleton.loading + " h-[50px] py-2 w-auto mb-4 rounded-md"
                }
              ></div>{" "}
              <div
                className={
                  Skeleton.loading + " h-[50px] py-2 w-auto mb-4 rounded-md"
                }
              ></div>
              <div className="flex items-center justify-center mt-6">
                <div
                  className={
                    Skeleton.loading +
                    " flex items-center justify-center px-6 py-2 rounded-lg h-[40px] w-[98px]"
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
