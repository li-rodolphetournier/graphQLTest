import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Movie {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true }) // Rendre la description optionnelle
  @Column({ nullable: true })
  description?: string;

  // Ajoutez d'autres champs ici si nécessaire, par exemple :
  // @Field(() => Int)
  // @Column()
  // duration: number;

  // @Field()
  // @Column()
  // release_date: string;
}
