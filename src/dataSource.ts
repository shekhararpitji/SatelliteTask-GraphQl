import 'reflect-metadata'
import { DataSource } from "typeorm";
import { User } from './entity/User';
import { Subscription } from './entity/Subscription';
import { Package } from './entity/Package';
import { Channel } from './entity/Channel';

export const appDataSource= new DataSource({
type:"mysql",
host:"localhost",
username:"root",
password:"root",
database:"dthdb",
synchronize:true,
entities:[User,Subscription,Package,Channel],

})