import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import React from "react";

interface TooggleProps {
    showPassword: boolean,
    toggleShowPassword: () => void,
}


const PasswordToggle: React.FC<TooggleProps> = ({showPassword, toggleShowPassword}) => {

    return ( 
        <>
            <button
                type="button"
                onClick={toggleShowPassword}
                className="ml-2 text-sm text-primary hover:text-indigo-900"
            >
                {showPassword ? <IconEye size={35} /> : <IconEyeClosed size={35} />}
            </button>
        </>
    );
}

export default PasswordToggle;