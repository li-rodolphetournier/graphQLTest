import { Field, InputType } from "type-graphql";

@InputType()
export class MovieInput {
  @Field()
  title: string;

  @Field({ nullable: true }) // La description est optionnelle ici aussi
  description?: string;

  // Ajoutez les mêmes champs optionnels/requis que dans l'entité si nécessaire
}
