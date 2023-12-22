import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm"

  import { Package } from "./Package"


  @Entity()
  export class Channel {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    name!: string

    @Column()
    category!: string
  
    @Column()
    duration!: string

    @ManyToOne(() => Package, (pack) => pack.channels)
    pack!: Package
  }