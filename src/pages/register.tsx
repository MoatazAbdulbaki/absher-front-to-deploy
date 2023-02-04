import React, { ChangeEvent, useRef } from 'react'
import { CustomInput } from '../components/Inputs';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { fetchApi } from './../helpers/api';
import Loader from '../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';
import CustomTitle from './../components/helpers/custom-title';
import { useAtom, atom } from 'jotai';
import { tokenAtom, userAtom } from './../store';

interface Props {

}
const Register: React.FC<Props> = () => {
  const { mutateAsync, isLoading } = useMutation(
    (data: any) => fetchApi("auth/signup", "POST", data), {
      onError: () => setIsError(true)
    }
  )

  const [_, setToken] = useAtom(tokenAtom);
  const [__, setUser] = useAtom(userAtom);
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();
  const { state } = useLocation();
  const formRef = useRef(null);
  const isValid = useRef(false);
  const [formValues, setFormValues] = useState({
    name: state?.name || "",
    phone_no: state?.phone_no || "",
    password: state?.password || "",
    address: state?.address || "",
    location: state?.location || "",
  });
  const handleChange = (e: ChangeEvent) => {
    const { name, value, validity, parentElement } =
      e.target as HTMLInputElement;
    setFormValues((pre) => ({
      ...pre, [name]: value
    }));
    if (!validity.valid) {
      parentElement?.classList.add("not_valid");
    } else {
      parentElement?.classList.remove("not_valid");
    }
    // @ts-ignore
    isValid.current = formRef?.current?.checkValidity() || false;
  };

  const handleSubmit = async () => {
    const res = await mutateAsync(formValues);
    if (res.status === 200) {
      setToken(res.data.token);
      setUser(res.data.userId);
      navigate('/');
    }
  }
  const goBackWithState = () => {
    setIsError(false)
    navigate('/register', {
      state: formValues
    })
  }
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="رقم الهاتف موجود مسبقاً!" goBackWithState={goBackWithState} />
  return (
    <section className='has-bg-image h-screen'>
      <CustomTitle title='اتدلل مع' />
      <form className="w-3/4 mx-auto max-w-md" ref={formRef}>
        <CustomInput
          arLabel='الاسم *'
          enLabel='name'
          handleChange={handleChange}
          placeholder="الاسم والنسبة"
          prevValue={formValues["name"]}
          isRtl={true}
          pattern="^[\u0621-\u064A]+.{5,}"
        />
        <CustomInput
          arLabel='رقم الهاتف *'
          enLabel='phone_no'
          handleChange={handleChange}
          type='tel'
          placeholder="رقم الموبايل بدون الصفر"
          prevValue={formValues["phone_no"]}
          pattern="^[9].{7}\d"
        />
        <CustomInput
          arLabel='كلمة السر *'
          enLabel='password'
          handleChange={handleChange}
          type='password'
          placeholder="ستة محارف على الأقل"
          pattern=".{6,}"
          prevValue={formValues["password"]}
        />
        <CustomInput
          arLabel='العنوان *'
          enLabel='address'
          handleChange={handleChange}
          isRtl={true}
          placeholder="العنوان بالتفصيل"
          pattern="^[\u0621-\u064A]+.{8,}"
          prevValue={formValues["address"]}
        />
        <button type="button" onClick={() => handleSubmit()} disabled={!isValid.current} className="mx-auto w-fit block text-main-red hover:text-white border border-main-red hover:bg-main-red focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8">انشاء حساب</button>
        <div className='flex items-center justify-evenly font-medium mt-6  max-w-xs	 mx-auto'>
          <Link
            to="/login"
            className="text-lg text-main-orange hover:text-main-red duration-300"
          >
            تسجيل الدخول
          </Link>
          <p className="text-lg text-main-black  duration-300">
            لديك حساب مسبقاً؟
          </p>
        </div>
        <div className='flex items-center justify-evenly font-medium mt-6  max-w-xs	 mx-auto'>
          <Link
            to="/"
            className="text-lg text-main-black underline hover:text-main-red duration-300 font-bold"
          >
            تخطّي تسجيل الدخول
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;