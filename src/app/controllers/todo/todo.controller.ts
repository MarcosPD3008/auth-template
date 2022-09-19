import BaseController from "../base/base.controller";
import { container, injectable } from "tsyringe";
import { json, Request, Response } from "express";
import { TODO } from "../../models/todo.models";
import TodoService from "../../services/todo/todo.service";

@injectable()
export class TodoController extends BaseController<TODO>{
    service!: TodoService;

    constructor(){
        super(container.resolve(TodoService));
    }
    
    override Get = async (req: Request, res: Response) =>{
        try{
            const { user } = req as any; 
            let query = req.query;

            if(!user)
                return res.status(400).json({
                    error: "unknown user"
                })
            else
                query = { ...query, userId: user.id }
            
            let data = await this.service.find(query);
            return res.status(200).json(data);
        }
        catch(error){
            return res.status(500).json(error)
        }
    }

    override Post = async (req: Request, res: Response) =>{
        try{
            //validate if body exists
            let body = req.body;
            if(!body)
                return res.status(400).json({
                    error: "the note is required"
                })
            
            //validate if user exists
            const { user } = req as any;
            if(!user)
                return res.status(400).json({
                    error: "unknown user"
                })
            
            //create note
            body.userId = user.id;
            let data = (await this.service.create(body)) 
                       ? true 
                       : false;

            return res.status(201).json({ 
                message: data ? "created": "not created", 
                success: data 
            });
        }
        catch(error){
            return res.status(500).json(error)
        }
    }
}
