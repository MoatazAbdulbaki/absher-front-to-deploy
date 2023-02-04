// import { useSelector } from "react-redux";
// import { UHE } from "../../../common/interfaces";

// interface Props {
//   arLabel: string;
//   enLabel: string;
//   isChecked: boolean | undefined;
//   handleChange: Function;
//   fieldName: string;
//   classesForStyles?: string;
// }
// export const CustomCheckbox: React.FC<Props> = ({
//   isChecked,
//   arLabel,
//   enLabel,
//   handleChange,
//   fieldName,
//   classesForStyles,
// }) => {
//   const { language } = useSelector((state: UHE) => state.common);
//   return (
//     <div
//       style={{ fontSize: "1.3rem", cursor: "pointer", userSelect: "none" }}
//       className={
//         isChecked
//           ? "active-free my-3 mx-4 "
//           : "non-active-free my-3 mx-4 " + classesForStyles
//       }
//       onClick={() => handleChange({ target: { value: !isChecked } }, fieldName)}
//     >
//       {isChecked ? (
//         <i className="far fa-check-square"></i>
//       ) : (
//         <i className="far fa-square"></i>
//       )}{" "}
//       {language === "EN" ? enLabel : arLabel}
//     </div>
//   );
// };

// export default CustomCheckbox;

export default {};