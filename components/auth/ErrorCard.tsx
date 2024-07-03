import React from 'react'
import { Card ,CardContent ,CardHeader ,CardFooter } from "../ui/card";
import BackButton from "./Backbutton";
import { Header } from "./Header";


const ErrorCard = () => {
  return (
    <Card className=' w-[400px] shadow-md bg-indigo-500'>
        <CardHeader>
            <Header label='Oops ! Something went wrong' />
        </CardHeader>
        <CardFooter>
            <BackButton label='Back to login' href='/auth/login'
            />
        </CardFooter>
    </Card>
  )
}

export default ErrorCard