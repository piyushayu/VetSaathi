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
  ImageUrl,
 }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm rounded-xl overflow-hidden h-[500px] border-none group">
      {/* Image fills entire card */}
      <img
        src={ImageUrl}
        alt={Name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      {/* Text sits on top */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-white font-bold text-xl">{Name}</h3>
        <p className="text-white/80 text-sm mt-1 line-clamp-2">{Info}</p>
        <Link to={Name.toLowerCase()} className="block mt-3 w-full">
          <button className="w-full border border-white text-white hover:bg-white hover:text-black bg-transparent rounded-lg py-2 transition-colors duration-200 cursor-pointer text-sm font-medium">
            Explore
          </button>
        </Link>
      </div>
    </Card>
  )
}

export default Animalcard