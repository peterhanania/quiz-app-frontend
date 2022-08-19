import { LockClosedIcon } from "@heroicons/react/solid";
import { User, Account } from "../utils/types";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Paginate from "./Pagination";

export default function AccountComponent({ username, previousScores }: User) {
  const [loginAccount, setLoginAccount] = useState<Account>({
    username: null,
    password: null,
  });
  const [signUpAccount, setSignUpAccount] = useState<Account>({
    username: null,
    password: null,
  });

  return (
    <>
      <div className="h-screen">
        <div className="w-full py-6 px-6 ">
          <div className="flex flex-col w-full bg-gray-300 dark:bg-[#15181a] mb-4 px-6 rounded-lg">
            <h1 className="uppercase text-2xl md:text-5xl font-extrabold dark:text-gray-200 text-gray-900 md:py-10 py-2 rounded-lg ">
              Profile
            </h1>
          </div>
          {username ? (
            <div className="w-full bg-gray-300 dark:bg-[#15181a] rounded-lg">
              <div className="flex items-center">
                <div className="text-xl text-slate-900 dark:text-white font-mono px-6 py-8 rounded-lg">
                  Hello {username}, you are logged in!
                </div>
                <p className="text-black dark:text-white font-bold text-md font-mono ">
                  <Link
                    href={process.env.NEXT_PUBLIC_API_URL + "/api/user/logout"}
                  >
                    <a className="opacity-60 hover:opacity-100">Logout</a>
                  </Link>{" "}
                  |{" "}
                  <Link href="/">
                    <a className="opacity-60 hover:opacity-100">Home</a>
                  </Link>
                </p>
              </div>
              <div className="text-md text-slate-900 dark:text-white font-mono px-6 py-2 rounded-lg">
                Recent Scores:
              </div>
              <Paginate previousScores={previousScores} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 lg:px-36 grid-cols-1 px-20 gap-4">
              <div className="">
                <div className="min-h-full flex items-center justify-center ">
                  <div className="w-full lg:max-w-md space-y-8 bg-gray-300 dark:bg-[#15181a] p-10 rounded-lg">
                    <div>
                      <h2 className="mt-6 text-3xl font-extrabold dark:text-gray-200 text-gray-900">
                        Login
                      </h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="pb-2">
                          <label htmlFor="username" className="sr-only">
                            username
                          </label>
                          <input
                            onChange={(e) => {
                              const validator = document.getElementById(
                                "username-validator-login"
                              );

                              if (validator) validator.innerHTML = "";
                              setLoginAccount({
                                ...loginAccount,
                                username: e.target.value,
                              });
                            }}
                            name="username"
                            type="username"
                            minLength={3}
                            maxLength={255}
                            autoComplete="username"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="username"
                          />

                          <p
                            id="username-validator-login"
                            className="text-red-500 text-xs mt-1"
                          ></p>
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            onChange={(e) => {
                              const validator = document.getElementById(
                                "password-validator-login"
                              );

                              if (e.target.value.length < 6) {
                                if (validator)
                                  validator.innerHTML =
                                    "Password must be at least 6 characters";
                                return;
                              }

                              if (e.target.value.length > 32) {
                                if (validator)
                                  validator.innerHTML =
                                    "Password must be less than 32 characters";
                                return;
                              }

                              if (validator) validator.innerHTML = "";
                              setLoginAccount({
                                ...loginAccount,
                                password: e.target.value,
                              });
                            }}
                            minLength={6}
                            maxLength={32}
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                          />
                          <p
                            id="password-validator-login"
                            className="text-red-500 text-xs mt-1"
                          ></p>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={(e: any) => {
                            e.preventDefault();

                            const validator = document.getElementById(
                              "username-validator-login"
                            );
                            const validator2 = document.getElementById(
                              "password-validator-login"
                            );

                            if (
                              !loginAccount.username &&
                              !loginAccount.password
                            ) {
                              if (validator)
                                validator.innerHTML = "username is required";
                              if (validator2)
                                validator2.innerHTML = "Password is required";
                              return;
                            }

                            if (!loginAccount.username) {
                              if (validator)
                                validator.innerHTML = "username is required";
                              return;
                            }

                            if (!loginAccount.password) {
                              if (validator2)
                                validator2.innerHTML = "Password is required";
                              return;
                            }

                            if (
                              loginAccount.password &&
                              loginAccount.password.length < 6
                            ) {
                              if (validator2)
                                validator2.innerHTML =
                                  "Password must be at least 6 characters";
                              return;
                            }

                            if (
                              loginAccount.password &&
                              loginAccount.password.length > 32
                            ) {
                              if (validator2)
                                validator2.innerHTML =
                                  "Password must be less than 32 characters";
                              return;
                            }

                            if (validator && validator2) {
                              validator.innerHTML = "";
                              validator2.innerHTML = "";

                              const data = {
                                username: loginAccount.username,
                                password: loginAccount.password,
                              };

                              e.target.innerHTML = "Logging in...";
                              e.target.disabled = true;
                              e.target.classList.add("cursor-not-allowed");

                              axios
                                .post(
                                  `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
                                  data,
                                  {
                                    withCredentials: true,
                                  }
                                )
                                .then((res) => {
                                  if (res.status === 200) {
                                    if (res.data.error) {
                                      if (validator)
                                        validator.innerHTML = res.data.error;
                                      if (validator2)
                                        validator2.innerHTML = res.data.error;
                                      e.target.innerHTML = "Register";
                                      e.target.disabled = false;
                                      e.target.classList.remove(
                                        "cursor-not-allowed"
                                      );
                                      return;
                                    }
                                    window.location.reload();
                                  }
                                })
                                .catch(() => {
                                  e.target.innerHTML = "Login";
                                  e.target.disabled = false;
                                  e.target.classList.remove(
                                    "cursor-not-allowed"
                                  );
                                  if (validator)
                                    validator.innerHTML =
                                      "Invalid username or password";

                                  if (validator2)
                                    validator2.innerHTML =
                                      "Invalid username or password";
                                });
                            }
                          }}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                            />
                          </span>
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="">
                {" "}
                <div className="min-h-full flex items-center justify-center">
                  <div className="w-full lg:max-w-md space-y-8 bg-gray-300 dark:bg-[#15181a] p-10 rounded-lg">
                    <div>
                      <h2 className="mt-6 text-3xl font-extrabold dark:text-gray-200 text-gray-900">
                        Register
                      </h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="pb-2">
                          <label htmlFor="username" className="sr-only">
                            username
                          </label>
                          <input
                            onChange={(e) => {
                              const validator = document.getElementById(
                                "username-validator-signup"
                              );

                              if (validator) validator.innerHTML = "";
                              setSignUpAccount({
                                ...signUpAccount,
                                username: e.target.value,
                              });
                            }}
                            name="username"
                            type="username"
                            minLength={3}
                            maxLength={255}
                            autoComplete="username"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="username"
                          />

                          <p
                            id="username-validator-signup"
                            className="text-red-500 text-xs mt-1"
                          ></p>
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            onChange={(e) => {
                              const validator = document.getElementById(
                                "password-validator-signup"
                              );

                              if (e.target.value.length < 6) {
                                if (validator)
                                  validator.innerHTML =
                                    "Password must be at least 6 characters";
                                return;
                              }

                              if (e.target.value.length > 32) {
                                if (validator)
                                  validator.innerHTML =
                                    "Password must be less than 32 characters";
                                return;
                              }

                              if (validator) validator.innerHTML = "";
                              signUpAccount.password = e.target.value;
                            }}
                            minLength={6}
                            maxLength={32}
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                          />
                          <p
                            id="password-validator-signup"
                            className="text-red-500 text-xs mt-1"
                          ></p>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={(e: any) => {
                            e.preventDefault();

                            const validator = document.getElementById(
                              "username-validator-signup"
                            );
                            const validator2 = document.getElementById(
                              "password-validator-signup"
                            );

                            if (
                              !signUpAccount.username &&
                              !signUpAccount.password
                            ) {
                              if (validator)
                                validator.innerHTML = "username is required";
                              if (validator2)
                                validator2.innerHTML = "Password is required";
                              return;
                            }

                            if (!signUpAccount.username) {
                              if (validator)
                                validator.innerHTML = "username is required";
                              return;
                            }

                            if (!signUpAccount.password) {
                              if (validator2)
                                validator2.innerHTML = "Password is required";
                              return;
                            }

                            if (
                              signUpAccount.password &&
                              signUpAccount.password.length < 6
                            ) {
                              if (validator2)
                                validator2.innerHTML =
                                  "Password must be at least 6 characters";
                              return;
                            }

                            if (
                              signUpAccount.password &&
                              signUpAccount.password.length > 32
                            ) {
                              if (validator2)
                                validator2.innerHTML =
                                  "Password must be less than 32 characters";
                              return;
                            }

                            if (validator && validator2) {
                              validator.innerHTML = "";
                              validator2.innerHTML = "";

                              const data = {
                                username: signUpAccount.username,
                                password: signUpAccount.password,
                              };

                              e.target.innerHTML = "Registering account...";
                              e.target.disabled = true;
                              e.target.classList.add("cursor-not-allowed");

                              axios
                                .post(
                                  `${process.env.NEXT_PUBLIC_API_URL}/api/user/create`,
                                  data,
                                  {
                                    withCredentials: true,
                                  }
                                )
                                .then((res) => {
                                  if (res.status === 200) {
                                    if (res.data.error) {
                                      if (validator)
                                        validator.innerHTML = res.data.error;
                                      if (validator2)
                                        validator2.innerHTML = res.data.error;
                                      e.target.innerHTML = "Register";
                                      e.target.disabled = false;
                                      e.target.classList.remove(
                                        "cursor-not-allowed"
                                      );
                                      return;
                                    }
                                    window.location.reload();
                                  }
                                })
                                .catch(() => {
                                  e.target.innerHTML = "Register";
                                  e.target.disabled = false;
                                  e.target.classList.remove(
                                    "cursor-not-allowed"
                                  );
                                  if (validator)
                                    validator.innerHTML =
                                      "An error occured, please try again later";

                                  if (validator2)
                                    validator2.innerHTML =
                                      "An error occured, please try again later";
                                });
                            }
                          }}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                            />
                          </span>
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
