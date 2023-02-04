interface Props {
  arLabel: string;
  enLabel: string;
  prevValue?: string | number | undefined;
  otherOptions?: object;
  isReadOnly?: boolean;
  type?: string;
  fieldName?: string;
  handleChange: Function;
  pattern?: string;
  placeholder?: string;
  isRtl?: Boolean;
}
export const CustomInput: React.FC<Props> = ({
  arLabel,
  enLabel,
  prevValue,
  isReadOnly,
  type,
  fieldName,
  handleChange,
  otherOptions,
  pattern,
  isRtl,
  placeholder
}) => {
  return (
    <div className="my-4">
      <label htmlFor={enLabel} className="block mb-2 text-lg font-medium text-black dark:text-whit px-2 rtl">{arLabel}</label>
      <input
        className={`bg-white border border-md border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${isRtl ? "rtl" : ""}`}
        type={type ? type : "text"}
        placeholder={placeholder || ""}
        id={enLabel}
        aria-describedby={enLabel}
        name={enLabel}
        onChange={(e) => handleChange(e, fieldName)}
        value={prevValue}
        disabled={isReadOnly}
        {...otherOptions}
        pattern={pattern || ""}
      />
    </div>
  );
};


export default CustomInput;