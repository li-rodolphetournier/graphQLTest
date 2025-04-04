import { Field, InputType } from "type-graphql";

@InputType()
export class GenreInput {
  @Field()
  name: string;
}
