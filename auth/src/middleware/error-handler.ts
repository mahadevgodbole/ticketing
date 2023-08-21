import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-errors';



export const errorHandler = (
    err: Error , 
    req : Request, 
    res : Response, 
    next : NextFunction
) =>{
    // console.log("Something went wrong", err);

    if(err instanceof RequestValidationError){
        console.log("Handling this error as request validation error");

        const formattedErrors= err.errors.map(error =>{

            return { message:error.msg, field: error.type};
        });

        return res.status(400).send({errors:formattedErrors})
    }

    if(err instanceof DatabaseConnectionError){
        console.log("Handling this error as a db connection error");

        return res.status(500).send({error:[
            {message:err.reason}
        ]})

    }


    res.status(400).send({
       errors:[
        {
            message:"Something went wrong"
        }
       ]
    })
}