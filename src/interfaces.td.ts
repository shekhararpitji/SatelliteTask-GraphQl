export interface UserInterface{
    name:string,
    email:string,
    password: string,
    mobile_number:string,
    role:string,
    active:boolean,
}

export interface PayloadInterface{
    id:number,
    email:string
}

export interface isValid{
    isLogin:boolean,
    role:string
}