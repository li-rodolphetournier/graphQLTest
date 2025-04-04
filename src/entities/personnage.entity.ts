import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cartoon } from "./cartoon.entities";

@ObjectType()
@Entity()
export class Personnage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string; // Description optionnelle

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture?: string; // URL de l'image, optionnelle

  @Field(() => Cartoon)
  @ManyToOne(() => Cartoon, (cartoon) => cartoon.personnages)
  cartoon: Cartoon;
}
