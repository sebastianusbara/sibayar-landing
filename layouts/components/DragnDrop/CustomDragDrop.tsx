"use client";

import { useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import React from "react";
import Swal from "sweetalert2";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB in bytes

type DragDropProps = {
    className?:string;
    acceptedTypes?:string[];
    onDrop?: (file: File) => void;
}

const DragAndDrop: React.FC<DragDropProps> = ({className, acceptedTypes = ["image/jpeg", "image/png", "image/jpg"], onDrop}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    addFilesInMemory(e.target.files)
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFilesInMemory(e.dataTransfer.files)
  }

  function addFilesInMemory(values: any) {
    if (values && values[0]) {
      for (let i = 0; i < values["length"]; i++) {
        const file = values[i]
        if (file.size <= 0) {
          Swal.fire({
            text: "File harus lebih dari 0Kb",
          })
        }  else if (file.size > MAX_FILE_SIZE) {
          Swal.fire({
            text: "File tidak boleh lebih dari 500kb",
          });
        } else if (isValidFileType(file)) {
          setFiles((prevState: any) => [...prevState, file])
          if (onDrop) {
            onDrop(file);
          }
        } else {
          Swal.fire({
            text: "Hanya mendukung file JPEG, JPG, dan PNG",
          })
        }
      }
    }
  }

  function isValidFileType(file: File) {
    return acceptedTypes.includes(file.type);
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className={`${
          dragActive ? "bg-red" : "bg-darkgray bg-zinc-100"
        }  ${className} w-full rounded-lg  min-h-[10rem] items-center justify-center flex flex-col text-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
        }}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        {files.length > 0 ? (
            <div className="flex flex-col items-center p-3">
                {files.map((file: any, idx: any) => (
                    <div key={idx} className="flex flex-row space-x-5">
                        <span>{file.name}</span>
                        <span
                            className="cursor-pointer text-red"
                            onClick={() => removeFile(file.name, idx)}
                        >
                            Hapus File
                        </span>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center">
                <IoMdPhotos size={36} color="gray" />
                <p className="font-bold mt-2 text-black-2">Drag and Drop File disini</p>
                <p className="mt-2 font-normal text-sm">atau</p>
                <p className="mt-4">
                    <span className="font-semibold text-blue-500 text-l cursor-pointer" onClick={openFileExplorer}>
                        Tambah File
                    </span>
                </p>
            </div>
        )}
      </form>
    </div>
  );
}

export default DragAndDrop
