'use client';

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import CustomInputField from "../../../layouts/components/TextInput/CustomInputField";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import DragAndDrop from "../../../layouts/components/DragnDrop/CustomDragDrop";
import { compressFile } from "../../../lib/utils/helper";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // show visibility of password and confirm password
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  // error message state
  const [emailErrorMessage, setEmailErrorMesage] = useState("")
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

  // field state
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [npwpFile, setNpwpFile] = useState<File | null>(null);
  const [bankFile, setBankFile] = useState<File | null>(null);

  const handleNextStepClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step == 3) {
      router.back();
    } else {
      if (step == 1) {
        if (validateFormData()) {
          setStep(step + 1);
        }
      } else {
        if (step === 2) {
          registerUser();
        } else {
          setStep(step + 1)
        }
      }
    }
  }

  const registerUser = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("confirmPassword", confirmPassword);
    if (ktpFile) formData.append("ktpImage", ktpFile);
    if (npwpFile) formData.append("npwpImage", npwpFile);
    if (bankFile) formData.append("bankImage", bankFile);

    const response = await fetch(`/dashboard/api/v1.0/auth/register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      setStep(step + 1);
    } else {
      alert(`Error: ${data.message || "Something went wrong"}`);
    }
  }

  const validateFormData = (): boolean => {
    let isValid = true;

    if (password === "") {
      setPasswordErrorMessage("Password tidak boleh kosong");
      isValid = false;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErrorMessage("Konfirmasi password tidak boleh kosong");
      isValid = false;
    }
    if (email === "") {
      setEmailErrorMesage("Email tidak boleh kosong");
      isValid = false;
    }
    if (name === "") {
      setNameErrorMessage("Nama tidak boleh kosong");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage("Konfrimasi password tidak sama dengan password");
      isValid = false;
    }

    return isValid;
  };


  const renderBorderColor = (isActive: boolean) => {
    if (isActive) {
      return "text-blue-900 border-blue-900";
    } else {
      return "border-gray-D3D3D3 text-gray-D3D3D3";
    }
  }

  const renderTextColor = (isActive: boolean) => {
    if (isActive) {
      return "text-blue-900 border-blue-900";
    } else {
      return "border-gray-D3D3D3 text-gray-D3D3D3";
    }
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleKtpDrop = async (file: File) => {
    const compressedFile = await compressFile(file);
    setKtpFile(compressedFile);
  };

  const handleNpwpDrop = async (file: File) => {
    const compressedFile = await compressFile(file);
    setNpwpFile(compressedFile);
  };

  const handleBankDrop = async (file: File) => {
    const compressedFile = await compressFile(file);
    setBankFile(compressedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py- bg-gray100">
      <div className="flex text-center h-screen w-full items-center justify-center">
        {/* left side */}
        <div className="hidden md:flex bg-white py-16 px-16 w-full h-screen flex-col">
          <div className="w-full flex justify-start pt-2 pr-4">
            <img src="/images/sibayar-logo.png" className="w-[100px]" />
          </div>
          <div className="w-full flex justify-start pt-8">
            <div className={`text-xl-2 mt-8 ${renderTextColor(step === 1)} font-semibold flex items-center`}>
              <span className={`flex items-center justify-center w-6 h-6 border ${renderBorderColor(step === 1)} rounded-full mr-2`}>
                {step > 1 ? <FaCheckCircle color="green" /> : "1"}
              </span>
              <span className="ml-2">Informasi Pribadi</span>
            </div>
          </div>
          <div className={`border-2 w-1 h-12 my-2 ml-2 ${step > 1 ? 'border-green-500' : 'border-gray-D3D3D3'} inline-block`}></div>
          <div className="w-full flex justify-start">
            <div className={`text-xl-2 ${renderTextColor(step === 2)} font-semibold flex items-center`}>
              <span className={`flex items-center justify-center w-6 h-6 border ${renderBorderColor(step === 2)} rounded-full mr-2`}>
                {step > 2 ? <FaCheckCircle color="green" /> : "2"}
              </span>
              <span className="ml-2">Dokumen Pendukung</span>
            </div>
          </div>
          <div className={`border-2 w-1 h-12 my-2 ml-2 ${step > 2 ? 'border-green-500' : 'border-gray-D3D3D3'} inline-block`}></div>
          <div className="w-full flex justify-start">
            <div className={`text-xl-2 ${renderTextColor(step === 3)} font-semibold flex items-center`}>
              <span className={`flex items-center justify-center w-6 h-6 border ${renderBorderColor(step === 3)} rounded-full mr-2`}>
                {step > 3 ? <FaCheckCircle color="green" /> : "3"}
              </span>
              <span className="ml-2">Registrasi Selesai</span>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="bg-gray text-black py-16 px-18 h-screen md:flex flex-col w-full">
          <form onSubmit={handleNextStepClick}>
            {step == 1 && (
              <>
                <div className="font-bold text-xl text-start">
                  Silahkan lengkapi data dan Registrasi dengan Kami
                </div>
                <div className="border-2 w-40 mt-2 mb-8 border-red flex"></div>
                <div className="text-xl-2 mt-8 text-black font-normal text-start">
                  Informasi Pribadi &emsp; <span className="font-medium text-darkgray">( 1 dari 3 )</span>
                </div>
                <div className="border-2 w-full mt-2 mb-8 border-gray inline-block"></div>
                <CustomInputField
                  className="w-full"
                  labelName="Nama"
                  required={true}
                  background='bg-white'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  name="username"
                />
                {nameErrorMessage !== "" && (
                  <span className="flex text-red text-xs text-start font-medium mt-2">
                    {nameErrorMessage}
                  </span>
                )}
                <div className="flex flex-row mt-4 space-x-4">
                  <div className="flex flex-col w-full">
                    <div className="relative flex flex-row items-center">
                      <CustomInputField
                        className="w-full"
                        type={isShowPassword ? 'text' : 'password'}
                        labelName="Password"
                        name="password"
                        background={'bg-white'}
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        aria-label={isShowPassword ? "Hide password" : "Show password"}
                      >
                        {isShowPassword ?
                          <MdVisibility size={22} /> :
                          <MdVisibilityOff size={22} opacity={0.5} />
                        }
                      </button>
                    </div>
                    {passwordErrorMessage !== "" && (
                      <span className="flex text-red text-xs text-start font-medium mt-2">
                        {passwordErrorMessage}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="relative flex flex-row items-center">
                      <CustomInputField
                        className="w-full"
                        type={isShowConfirmPassword ? 'text' : 'password'}
                        background={'bg-white'}
                        labelName="Konfirmasi Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2"
                        onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        aria-label={isShowConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {isShowConfirmPassword ?
                          <MdVisibility size={22} /> :
                          <MdVisibilityOff size={22} opacity={0.5} />
                        }
                      </button>
                    </div>
                    {confirmPasswordErrorMessage !== "" && (
                      <span className="flex text-red text-xs text-start font-medium mt-2">
                        {confirmPasswordErrorMessage}
                      </span>
                    )}
                  </div>


                </div>
                <CustomInputField
                  className="w-full mt-4"
                  labelName="Nomer HP"
                  background='bg-white'
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                  name="phone"
                />
                <CustomInputField
                  className="w-full mt-4"
                  labelName="Email"
                  background='bg-white'
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  name="email"
                  required={true}
                />
                {emailErrorMessage !== "" && (
                  <span className="flex text-red text-xs text-start font-medium mt-2">
                    {emailErrorMessage}
                  </span>
                )}
              </>
            )}
            {step == 2 && (
              <div>
                <div className="text-xl-2 mt-12 text-black font-medium text-start">
                  Dokumen Pendukung &emsp; <span className="font-medium text-gray-D3D3D3">(2 dari 3)</span>
                </div>
                <div className="w-full border-2 mt-2 mb-8 border-gray inline-block"></div>
                <div className="flex flex-row w-full">
                  <div className="block font-medium text-sm flex-col w-1/2 mr-4">
                    <p className="mb-2">KTP</p>
                    <DragAndDrop onDrop={handleKtpDrop} />
                  </div>
                  <div className="block font-medium text-sm flex-col w-1/2 ml-4">
                    <p className="mb-2">NPWP</p>
                    <DragAndDrop onDrop={handleNpwpDrop} />
                  </div>
                </div>
                <div className="block font-medium text-sm w-1/2 pr-4 mt-12">
                  <p className="mb-2 mt-4">Buku Bank</p>
                  <DragAndDrop onDrop={handleBankDrop} />
                </div>
              </div>
            )}
            {step == 3 && (
              <>
                <div className={`flex flex-col items-start ${!isMobile ? "mr-60" : ""}`}>
                  <span className="font-bold text-2xl text-start">Terima Kasih <br /> telah menyelesaikan proses registrasi</span>
                  <span className="font-medium text-start text-xm mt-8">Informasi Anda telah diterima, dan kami sangat senang untuk memiliki Anda bergabung! Mohon tunggu dengan sabar sementara tim kami memverifikasi detail Anda. Kami akan memberi tahu Anda segera setelah akun Anda diverifikasi. Sementara itu, silakan Login dan jelajahi situs web kami dan bersiaplah untuk pengalaman yang luar biasa ke depannya!</span>
                </div>
              </>
            )}

            <div className="w-full flex flex-row justify-between items-center">
              {step < 3 && <div className="w-full flex flex-row items-center mt-8">
                <FaArrowLeft className="cursor-pointer hover:bg-white" onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    router.back();
                  }
                }} />
                <span className="cursor-pointer hover:underline font-medium text-graydark ml-4" onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    router.back();
                  }
                }}>
                  {step === 1 ? "Kembali" : "Step Sebelumnya"}
                </span>
              </div>}

              <button
                type="submit"
                className={`font-medium cursor-pointer flex items-center rounded-md border text-xm border-primary bg-primary p-2 text-white transition hover:bg-white hover:text-primary hover:border-primary mt-8 ${step > 2 ? 'hover:underline' : null}`}
              >
                <span>{step > 2 ? "Kembali ke halaman login" : "Lanjutkan"}</span>
                <BiRightArrowAlt className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
