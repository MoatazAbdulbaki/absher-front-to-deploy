import { Link } from "react-router-dom";
import { Place } from '../../types'

const PlacePreview: React.FC<Place> = ({ icon, name, _id}) => {
  return (
    <Link to={"/places/"+_id} className="min-w-[130px] flex flex-col mx-2 gap-1 items-center h-[130px] bg-[#fee2e2] rounded-full overflow-hidden my-3">
      <div className="w-[75px] h-[75px] overflow-hidden">
        <img src={import.meta.env.VITE_API_ROOT + icon} className="w-full h-full" />
      </div>
      <p className="w-[40px] flex justify-center items-center text-md rtl m-0 p-0 text-main-black font-bold">{name}</p>
    </Link>
  )
}

export default PlacePreview;