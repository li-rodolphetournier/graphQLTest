import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { In } from "typeorm";
import { dataSource } from "../client";
import { Cartoon } from "../entities/cartoon.entities";
import { Genre } from "../entities/genre.entity";
import { Personnage } from "../entities/personnage.entity";
import { CartoonInput } from "../schemas/cartoon.schema";

@Resolver(Cartoon)
export class CartoonResolver {
  @Query(() => Cartoon, { nullable: true })
  async getOneCartoonById(
    @Arg("id", () => Int) id: number
  ): Promise<Cartoon | null> {
    // Charger aussi les relations genres et personnages
    return dataSource.getRepository(Cartoon).findOne({
      where: { id },
      relations: ["genres", "personnages"],
    });
  }

  @Query(() => [Cartoon])
  async getCartoons(): Promise<Cartoon[]> {
    // Charger aussi les relations genres et personnages
    return dataSource.getRepository(Cartoon).find({
      relations: ["genres", "personnages"],
    });
  }

  @Mutation(() => Cartoon)
  async createCartoon(
    @Arg("cartoonData") cartoonData: CartoonInput
  ): Promise<Cartoon> {
    // 1. Extraire genres et personnages
    const {
      genres: genreNames,
      personnages: personnageInputs,
      ...restCartoonData
    } = cartoonData;

    // 2. Créer l'instance Cartoon de base
    const newCartoon = dataSource
      .getRepository(Cartoon)
      .create(restCartoonData);

    // 3. Gérer les genres
    if (genreNames && genreNames.length > 0) {
      const foundGenres = await dataSource
        .getRepository(Genre)
        .findBy({ name: In(genreNames) });
      newCartoon.genres = foundGenres;
    } else {
      newCartoon.genres = [];
    }

    // 4. Gérer les personnages
    if (personnageInputs && personnageInputs.length > 0) {
      // Crée les instances Personnage mais ne les sauvegarde pas encore
      const newPersonnages = personnageInputs.map((pInput) => {
        const personnage = dataSource.getRepository(Personnage).create(pInput);
        // Important : Lier le personnage au cartoon qui va être créé
        personnage.cartoon = newCartoon;
        return personnage;
      });
      // Assigner les personnages créés au cartoon
      // TypeORM gérera la sauvegarde en cascade car la relation est définie
      newCartoon.personnages = newPersonnages;
    } else {
      newCartoon.personnages = [];
    }

    // 5. Sauvegarder l'instance Cartoon (et les Personnages associés par cascade)
    // Note: S'assurer que les cascades sont bien configurées ou sauvegarder les personnages explicitement si nécessaire
    // Pour l'instant, on se fie à l'assignation `personnage.cartoon = newCartoon` avant la sauvegarde du cartoon.
    return dataSource.getRepository(Cartoon).save(newCartoon);
  }

  @Mutation(() => Boolean)
  async deleteCartoon(@Arg("id", () => Int) id: number): Promise<boolean> {
    // Pour une suppression propre, il faudrait peut-être gérer les personnages associés
    // (suppression en cascade ou déliaison). Pour l'instant, suppression simple.
    const deleteResult = await dataSource.getRepository(Cartoon).delete(id);
    return (
      deleteResult.affected !== undefined &&
      deleteResult.affected !== null &&
      deleteResult.affected > 0
    );
  }
}
