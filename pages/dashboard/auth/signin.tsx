'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation'
import CustomInputField from "../../../layouts/components/TextInput/CustomInputField";
import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import { getSession, signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login | Sibayar";
  }, []);

  const handleSubmitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)


    // const result = await signIn('credentials', {
    //   redirect: false,
    //   email,
    //   password,
    // });

    // if (result?.ok) {
    //   const session = await getSession();
    //   if (session?.user.role === 'ADMIN') {
    //     router.push("/dashboard/admin/dashboard")
    //   } else {
    //     navigateToHome();
    //   }
    // } else {
    //   setErrorMessage(result?.error || "An error occurred");
    // }

    setLoading(false)
  };

  const handleSignupClick = () => {
    router.push("/dashboard/auth/signup");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center bg-gray100">
      <div className="flex text-center h-screen w-full items-center justify-center">
        {/* Left Side */}
        <div className="hidden md:flex bg-rose-400 p-5 items-center justify-center py-36 w-full min-h-screen flex-col">
          <p className="text-3xl font-bold text-white">Selamat Datang Mitra Sibayar!</p>
          <div className="border-2 w-20 mt-4 mb-4 border-white inline-block"></div>
        </div>

        {/* Right Side */}
        <div className="bg-white text-black py-2 px-4 w-full min-h-screen md:flex flex-col">
          <div className="w-full flex justify-end pt-2 pr-4">
            <img src="/images/sibayar-logo.png" className="w-[100px]" />
          </div>
          <div className="flex-grow flex flex-col justify-center min-w-fit">
            <div className="text-black-2 font-bold text-center text-3xl mt-12">
              <p>Masuk ke Akun Anda</p>
            </div>
            <div className="border-2 w-20 mt-4 mb-4 border-rose-400 inline-block mx-auto"></div>
            <form className="mt-12 px-6" onSubmit={(e) => handleSubmitEmail(e)}>
              <div className="mb-4">
                <div className="relative">
                  <CustomInputField
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setErrorMessage("")
                    }}
                    placeholder="Masukkan email"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg" >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <div className="relative">
                  <CustomInputField
                    className="mt-2"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Masukkan Password"
                    name="otp"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("")
                    }}
                  />
                  <span className="absolute right-4 top-4">
                    {isShowPassword ?
                      <MdVisibility size={22} onClick={() => setIsShowPassword(false)} /> :
                      <MdVisibilityOff size={22} opacity={0.5} onClick={() => setIsShowPassword(true)} />
                    }
                  </span>

                </div>

                {errorMsg !== null && (
                  <span className="flex text-red text-xs text-start font-bold mt-2">
                    {errorMsg}
                  </span>
                )}
                <div className="w-full flex justify-end font-medium text-xs mt-2">
                  User baru? <span className="font-medium text-blue-500 ml-1 hover:underline" onClickCapture={handleSignupClick} style={{ cursor: 'pointer' }}>Buat Akun</span>
                </div>
              </div>


              <div className="mb-5 mt-8 w-full flex flex-col">
                <div className="flex flex-row items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-white hover:text-primary hover:border-primary"
                  >
                    {isLoading ? ButtonLoader() : 'Masuk'}
                  </button>
                  <button
                    type="button"
                    className="ml-4 w-1/2 cursor-pointer rounded-lg border border-primary p-4 text-primary transition hover:bg-red hover:text-white"
                    onClick={() => {
                      window.location.href = 'https://sibayar.id/';
                    }}
                  >
                    Lihat Tentang Sibayar!
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignIn;

const ButtonLoader = () => {
  return (
    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="color-white" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};
