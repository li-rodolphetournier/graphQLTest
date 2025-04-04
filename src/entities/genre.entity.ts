import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Cartoon } from "./cartoon.entities";

@ObjectType()
@Entity()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true }) // Le nom du genre doit être unique
  name: string;

  @Field(() => Cartoon)
  @ManyToOne(() => Cartoon, (cartoon) => cartoon.genres)
  cartoon: Cartoon;
}
