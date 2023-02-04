import { Link } from "react-router-dom";
import { Owner } from '../../types'

const OwnerPreview: React.FC<Owner> = ({ imageUrl, name, _id,description}) => {
  return (
    <Link to={"/place/" + _id} className="w-full flex flex-col mx-2 gap-1 items-center min-h-[200px] max-h-[250px] bg-[#fee2e2] rounded-xl overflow-hidden my-5">
      <div className="w-full h-[140px] overflow-hidden">
        <img src={import.meta.env.VITE_API_ROOT + imageUrl} className="w-full h-full" />
      </div>
      <div className="flex flex-col justify-start rtl self-end pr-2 py-2">
        <p className="text-md rtl m-0 mt-1 text-main-black font-bold">{name}</p>
        <p className="text-sm rtl m-0 mt-1 text-main-black">{description}</p>
      </div>
    </Link>
  )
}

export default OwnerPreview;