
import { Link } from "react-router-dom";


interface Props {
  close: Function;
  message: string;
  linkName?: string;
  link?: string;
}

const PopUp: React.FC<Props> = ({ close, message, link, linkName }) => {
  return (
    <div className="w-screen h-screen bg-[#000000b5] fixed top-0 left-0 flex justify-center items-center">
      <div className="w-[75vw] min-h-[250px] h-fit flex flex-col justify-evenly items-center gap-4 bg-white rounded-lg">
        <p className="text-lg font-medium px-4 pt-4 text-end">{message}</p>
        <div className='flex flex-col justify-between items-center mt-4'>
          {link && linkName ?
            <Link to={link} className="text-white w-[150px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              {linkName}
            </Link>
            : null
          }
          <button onClick={() => close(false)}
            className="text-white w-[150px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
