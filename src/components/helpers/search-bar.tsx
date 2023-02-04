import { useRef } from 'react';

interface Props {
  handlePress: Function;
}
const SearchBar: React.FC<Props> = ({ handlePress }) => {
  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <div className="relative h-[50px] w-full  flex flex-row-reverse">
      <input type="search" ref={searchInput} className="block p-2.5 w-full text-xl text-main-black bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-blue-400 focus:ring-blue-500 focus:outline-none focus:border-blue-500 rtl placeholder:text-black" placeholder="ابحث..." />
      <button onClick={()=>handlePress(searchInput?.current?.value)} className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-l-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 block">
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
    </div>
  );
};


export default SearchBar;