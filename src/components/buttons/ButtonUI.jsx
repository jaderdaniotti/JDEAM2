import { Link } from "react-router-dom";

export default function ButtonUI({text, link = "#", variant = "primary", size = "md"}) {
    const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
        ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    };
    
    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl",
        xl: "px-10 py-5 text-xl rounded-3xl",
    };
    
    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]}`;
    
    return (
        <Link to={link}>
            <button className={buttonClasses}> 
                <span>{text}</span>
            </button>
        </Link>
    );
}