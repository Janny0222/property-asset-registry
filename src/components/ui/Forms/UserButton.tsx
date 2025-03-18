'use client'

import { ButtonProps } from "@/types/propTypes";

export const LoginButton = () => {
    return (
        <button type="submit" className="transition duration-300 ease-in-out w-full border my-2 p-2 rounded border-buttonColor bg-mainColor text-lightColor hover:bg-fontColor ">
            Login
        </button>
    );
};

export const LogoutButton = ({onClick} : ButtonProps) => {
    return (
        
        <button onClick={onClick} type="submit" className="transition duration-300 ease-in-out w-full border my-2 p-2 rounded border-buttonColor bg-mainColor text-lightColor hover:bg-fontColor ">
            Logout
        </button>
        
    )
}

export const CommonButton = ({onClick, name, wFull, type, disabled} : ButtonProps) => {
    return (
        <form onClick={onClick}>
            <button type={type} disabled={disabled} className={`transition duration-300 ease-in-out border p-2 ${wFull ? 'w-full' : ''} rounded border-buttonColor bg-mainColor text-lightColor hover:bg-fontColor`}>
                {name}
            </button>
        </form>
    )
}