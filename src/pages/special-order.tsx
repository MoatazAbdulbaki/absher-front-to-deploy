import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/utils';

import { CustomTextarea } from '../components/Inputs';

import CustomTitle from '../components/helpers/custom-title';
import Loader from '../components/helpers/Loader';
import ErrorBoundary from '../components/helpers/error-boundary';
import PopUp from '../components/helpers/pop-up';

import { tokenAtom, userAtom, workTime } from '../store';
import { fetchApi } from '../helpers/api';

interface Props {

}

const SpecialOrder: React.FC<Props> = () => {
  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userAtom);
  const [showPopup, setShowPopup] = useState(false);
  const { mutate, isLoading, isError, error } = useMutation(
    (data: any) => fetchApi("order", "POST", data, token), {
    onSuccess: () => {
      setShowPopup(true)
      setFormValues({ order_message: "" })
    }
  }
  )

  const [formValues, setFormValues] = useState({
    order_message: "",
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues((pre) => ({
      ...pre, [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formValues.order_message.length < 10) {
      alert("عشرة محارف على الأقل")
    }
    mutate({
      userId,
      orderMessage: formValues.order_message
    });
  }
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="خطأ أثناء إرسال الطلب, الرجاء المحاولة لاحقاً" />
  return (
    <section className='has-bg-image h-screen  pb-[10vh]'>
      <CustomTitle title='اتدلل مع' />
      <form className="w-3/4 mx-auto  max-w-md">
        <CustomTextarea
          arLabel='الطلب'
          enLabel='order_message'
          handleChange={handleChange}
          placeholder="عشرة محارف على الأقل"
          prevValue={formValues["order_message"]}
          otherOptions={{ rows: "10" }}
          isRtl
        />
        <button type="button"
          onClick={(e) => handleSubmit(e)} disabled={formValues.order_message.length < 10}
          className="mx-auto w-fit block text-main-red hover:text-white border border-main-red hover:bg-main-red focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8"
        >إرسال الطلب</button>
      </form>
      <>
        {
          showPopup ?
            <PopUp close={setShowPopup} message={`تمّ ارسال الطلب بنجاح, سيتم الان مراجعة طلبك وابلاغك عند قبول الطلب
            ${workTime}`}
              linkName="مراجعة الطلب" link='/orders' />
            : null
        }
      </>
    </section>
  );
}

export default SpecialOrder;