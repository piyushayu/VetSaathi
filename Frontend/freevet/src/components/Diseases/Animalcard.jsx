import React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

 function Animalcard({
  Name , 
  Info ,
 }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{Name}</CardTitle>
        <CardDescription>
         {Info}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={Name.toLowerCase()}><Button className="w-full"> Explore </Button></Link>
      </CardFooter>
    </Card>
  )
}

export default Animalcard