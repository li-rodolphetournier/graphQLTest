import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "../client";
import { Movie } from "../entities/movie.entity";
import { MovieInput } from "../schemas/movie.schema";

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    return dataSource.getRepository(Movie).find();
  }

  @Query(() => Movie, { nullable: true })
  async getOneMovieById(
    @Arg("id", () => Int) id: number
  ): Promise<Movie | null> {
    return dataSource.getRepository(Movie).findOne({ where: { id } });
  }

  @Mutation(() => Movie)
  async createMovie(@Arg("movieData") movieData: MovieInput): Promise<Movie> {
    const newMovie = dataSource.getRepository(Movie).create(movieData);
    return dataSource.getRepository(Movie).save(newMovie);
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number): Promise<boolean> {
    const deleteResult = await dataSource.getRepository(Movie).delete(id);
    return (
      deleteResult.affected !== undefined &&
      deleteResult.affected !== null &&
      deleteResult.affected > 0
    );
  }
}
