import { Field, InputType, Int } from "type-graphql";
import { PersonnageInput } from "./personnage.schema";

// Supprimer l'ancien export de la chaîne de caractères Cartoon
// export const Cartoon = `{
//   id: ID
//   name: String
//   description: String
//   nb_of_episodes: Int
//   nb_of_seasons: Int
//   genres: [String]
//   realisator: String
//   author: String
//   ft_diffusion: String
//   personnages: [Personnage]
// }`;

// Supprimer l'ancien export de la chaîne de caractères CartoonInput
// export const CartoonInput = `{
//   name: String
//   description: String
//   nb_of_episodes: Int
//   nb_of_seasons: Int
//   genres: [String]
//   realisator: String
//   author: String
//   ft_diffusion: String
//   personnages: [PersonnageInput]
// }`;

@InputType()
export class CartoonInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  nb_of_episodes: number;

  @Field(() => Int)
  nb_of_seasons: number;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field()
  realisator: string;

  @Field()
  author: string;

  @Field()
  ft_diffusion: string;

  @Field(() => [PersonnageInput], { nullable: true })
  personnages?: PersonnageInput[];
}
