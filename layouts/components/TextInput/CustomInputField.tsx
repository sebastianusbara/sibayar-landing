// TextInput.tsx or TextInput.jsx depending on your setup
import React, { ReactElement } from 'react';

type TextInputProps = {
    placeholder?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    labelName?: string;
    icon?: ReactElement;
    type?: string;
    name?: string;
    background?: String;
    required?: boolean;
};

const CustomInputField: React.FC<TextInputProps> = ({ background = 'bg-transparent', icon, labelName, placeholder, className, onChange, value, type = 'text', name, required }) => {
    return (
        <div className={`${className}`}>
            {labelName && (
                <label className="mb-2.5 block font-medium text-start text-sm">
                    {required && <span className="text-red mr-0.5">*</span>}
                    {labelName}
                    {/* {required && (
                        <span className="text-red ml-2 italic font-normal text-xs">
                            (Wajib)
                        </span>
                    )} */}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className={`w-full rounded-lg border border-stroke ${background} py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {icon && <span className="absolute right-4 top-4">{icon}</span>}
            </div>
        </div>
    );
};

export default CustomInputField;
