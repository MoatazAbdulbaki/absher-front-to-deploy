import logo from '../../assets/images/absherLogoEdited.jpg'
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  isSpaceBetween?:boolean
}

const CustomTitle: React.FC<Props> = ({ title,isSpaceBetween }) => {
  return (
    <div className={'font-bold text-center mb-6 text-main-red flex items-center h-fit pt-6 ' + `${isSpaceBetween ? "justify-evenly" : "justify-center"}`}>
      <Link to='/' className='w-[120px] h-[80px]'>
        <img src={logo} />
      </Link>
      <p className='h-fit text-main-red font-black  funky-font' style={{ fontSize: "45px" }}>{title}</p>
    </div>
  );
};

export default CustomTitle;
