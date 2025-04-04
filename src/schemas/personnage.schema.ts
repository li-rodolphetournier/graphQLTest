import { Field, InputType } from "type-graphql";

// Supprimer les anciennes définitions en chaîne
// export const Personnage = `...`;
// export const PersonnageInput = `...`;

@InputType()
export class PersonnageInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  picture?: string;
}
