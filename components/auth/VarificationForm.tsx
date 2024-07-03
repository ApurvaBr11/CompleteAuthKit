'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import CardWrapper from './CardWrapper';
import { useSearchParams } from 'next/navigation';
import { newVarification } from '@/actions/newVerification';
import FormSuccess from '../FormSucces';
import FormError from '../FormError';

const VarificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [sucess, setSucess] = useState<string | undefined>()
  const searchParams =  useSearchParams();
  const token = searchParams.get('token');
  const onSubmit = useCallback(() => {
    if(sucess || error) return;
    if(!token) {
      setError("Missing token")
      return
    }
    newVarification(token).then((data)=>{
      setSucess(data.sucess);
      setError(data.error);
    }).catch(()=>{
      setError("Something went wrong")
    })
  },[token, sucess , error]);

  useEffect(() => {
   onSubmit()
  }, [onSubmit])
  

  return (
    <CardWrapper headerLabel='Confirm ur verification' backButtonHref='/auth/login' backButtonLabel='Back to login'>
        <div className="flex items-center w-full justify-center ">
          {!sucess && !error && (
          <BeatLoader/>
          )}
          <FormSuccess message={sucess}/>
          {!sucess && (
          <FormError message={error}/>
          )}
        </div>
    </CardWrapper>
  )
}

export default VarificationForm;