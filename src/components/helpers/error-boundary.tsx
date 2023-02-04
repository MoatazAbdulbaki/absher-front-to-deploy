import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/error.svg";

interface Props {
  errorMessage: string;
  goBackWithState?: Function;
}

const ErrorBoundary: React.FC<Props> = ({ errorMessage, goBackWithState }) => {
  return (
    <div className="error_image_overlay w-screen h-screen fixed top-0 left-0 opacity-75 bg-zinc-300 flex flex-col justify-center items-center has-bg-image">
      <img src={img} alt="error" className="opacity-1 w-[150px]" />
      <p className="opacity-1 text-xl mt-4 font-medium text-main-black text-center">{errorMessage}</p>
      <span className="text-lg text-main-orange hover:text-main-red duration-300 underline mt-2"
        onClick={() => {
          if (goBackWithState) {
            goBackWithState()
          } else {
            window.location.reload()
          }
        }
        }
      >عودة</span>
    </div>
  );
};

export default ErrorBoundary;
