import React, { ChangeEvent } from 'react'
import { CustomInput } from '../components/Inputs';
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from './../components/helpers/Loader';
import ErrorBoundary from '../components/helpers/error-boundary';
import { fetchApi } from './../helpers/api';
import { useMutation } from '@tanstack/react-query';
import CustomTitle from './../components/helpers/custom-title';
import { atom, useAtom } from 'jotai';
import { tokenAtom, userAtom } from './../store';

interface Props {

}

const Login: React.FC<Props> = () => {
  const { mutateAsync, isLoading } = useMutation(
    (data: any) => fetchApi("auth/login", "POST", data), {
    onError: () => setIsError(true)
  }
  )
  const navigate = useNavigate();
  const { state } = useLocation();
  const formRef = useRef(null);
  const isValid = useRef(false);
  const [isError, setIsError] = useState(false)
  const [_, setToken] = useAtom(tokenAtom);
  const [__, setUser] = useAtom(userAtom);
  const [formValues, setFormValues] = useState({
    phone_no: state?.phone_no || "",
    password: state?.password || "",
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
    navigate('/login', {
      state: formValues
    })
  }
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="رقم الهاتف غير موجود او كلمة مرور خاطئة" goBackWithState={goBackWithState} />
  return (
    <section className='has-bg-image h-screen  pb-[10vh]'>
      <CustomTitle title='اتدلل مع' />
      <form className="w-3/4 mx-auto  max-w-md" ref={formRef}>
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
        <button type="button" onClick={() => handleSubmit()} disabled={!isValid.current} className="mx-auto w-fit block text-main-red hover:text-white border border-main-red hover:bg-main-red focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8">تسجيل الدخول</button>
        <div className='flex items-center justify-evenly font-medium mt-6  max-w-xs mx-auto'>
          <Link
            to="/register"
            className="text-lg text-main-orange hover:text-main-red duration-300"
          >
            انشاء حساب
          </Link>
          <p className="text-lg text-main-black  duration-300">
            لا يوجد لديك حساب؟
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

export default Login;