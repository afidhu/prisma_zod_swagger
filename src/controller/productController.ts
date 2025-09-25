import type { Request ,Response, NextFunction } from "express"
import { prisma } from "../index.ts";
import { number } from "zod";


export const addProduct = async(req:Request, resp:Response)=>{
    const{title,content , price} = req.body;
    const reqult =await prisma.post.create({
        data:{
            price:price,
            title:title,
            content:content
        }
    });
    if(reqult){
        return resp.status(201).json(reqult)
    }
}

export const getProduct = async(req:Request, resp:Response)=>{
    const result = await prisma.post.findMany();
    return resp.status(200).json(result)
}


//////////////get by id

export const updateProduct = async(req:Request, resp:Response)=>{
    const{id} = req.params;
    const{title,content , price} = req.body;
    const reqult =await prisma.post.update({
        where:{
            id:Number(id)
        },
        data:{
            price:price,
            title:title,
            content:content
        },
        select:{
            content:true,
            createdAt:true,
            id:true,
            price:true,
            title:true,
            updatedAt:true
        }
    });
    if(reqult){
        return resp.status(200).json(reqult)
    }
}

export const getSingleProduct = async(req:Request, resp:Response)=>{
    const{id} = req.params;
    const result =await prisma.post.findFirst({
        where:{
              id:Number(id)
        },
        select:{
             content:true,
            createdAt:true,
            id:true,
            price:true,
            title:true,
            updatedAt:true
        }
    })

    return resp.status(200).json(result)
}  