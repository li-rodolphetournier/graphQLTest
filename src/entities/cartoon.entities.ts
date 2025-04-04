import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Genre } from "./genre.entity";
import { Personnage } from "./personnage.entity";

@ObjectType()
@Entity()
export class Cartoon {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  nb_of_episodes: number;

  @Field(() => Int)
  @Column()
  nb_of_seasons: number;

  @Field()
  @Column()
  realisator: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  ft_diffusion: string;

  @Field(() => [Genre], { nullable: true })
  @OneToMany(() => Genre, (genre) => genre.cartoon)
  genres?: Genre[];

  @Field(() => [Personnage], { nullable: true })
  @OneToMany(() => Personnage, (personnage) => personnage.cartoon)
  personnages?: Personnage[];
}
