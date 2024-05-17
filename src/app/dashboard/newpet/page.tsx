"use client"

import { useSession } from "next-auth/react";
import { useState } from "react"

const Newpet = () => {
    const { status } = useSession();
    const [namePet, setNamePet] = useState<string>();
    const [agePet, setAgePet] = useState<number>();
    const [descriptionPet, setdescriptionPet] = useState<string>();
    const [imagePet, setImagePet] = useState<string>();


    return (
        <>
        </>
    );

};
export default Newpet;

/**
 *  
    idPet: number;
    namePet: string;
    pet: string;
    age: number;   
    description: string;
    image: string;
    createdAt: Date;
    updateAt: Date;
    softDeleteDat: Date;    
    isActive: number;
 */