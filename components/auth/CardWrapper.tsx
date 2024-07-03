'use client'

import { Card ,CardContent ,CardHeader ,CardFooter } from "../ui/card";
import BackButton from "./Backbutton";
import { Header } from "./Header";
import Social from "./Social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;
}

const CardWrapper = ({
    children,headerLabel,backButtonLabel,backButtonHref,showSocial
}:CardWrapperProps) => {
  return (
    <Card className="shadow-md w-[400px] bg-white">
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
        {children}
        </CardContent>
        {showSocial &&  (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButton 
            label={backButtonLabel}
            href={backButtonHref}
            >

            </BackButton>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper