import 'reflect-metadata'
import { DataSource } from "typeorm";
import { User } from './entity/User';
import { Subscription } from './entity/Subscription';
import { Package } from './entity/Package';
import { Channel } from './entity/Channel';
import dotenv from 'dotenv'
dotenv.config();
export const appDataSource= new DataSource({
type:"mysql",
host:"localhost",
username:process.env.username,
password:process.env.password,
database:process.env.database,
synchronize:true,
entities:[User,Subscription,Package,Channel],

})