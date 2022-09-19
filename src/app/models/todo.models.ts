import mongoose from "mongoose";
import BaseModel from "./base/base.model";

export interface TODO extends BaseModel{
    title: string;
    content:string;
    status: boolean;
    userId: string;
}

export const TodoSchema = new mongoose.Schema<TODO>({
    title: { 
        type: String, 
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    userId:{
        type: String,
        required: true,
    }
})

export default mongoose.model<TODO>("TODO", TodoSchema);