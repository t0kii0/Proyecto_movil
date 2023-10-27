import { Type } from "@angular/core"
import { TypeUser } from "../modelos/Response"

export interface UserModel {

    user_id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    type: TypeUser
    created_at: Date,
    username: Text,
    password: Text
}