import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm"
import { Subscription } from "./Subscription"

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    email!: string
  
    @Column()
    password!: number

    @Column()
    mobile_number!: number

    @Column()
    role!: string

    @Column()
    active!: boolean

    @OneToMany(()=> Subscription, (subscription)=> subscription.user, { cascade:true})
    subscription!: Subscription[];
  
  }