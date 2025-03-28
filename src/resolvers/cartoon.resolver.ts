import { Cartoon } from "../types/cartoon.type";
import { default as cartoons } from "../../dataset.json";

const getOneCartoonById = (): Cartoon => {
  return cartoons[0] as Cartoon;
};

export { getOneCartoonById };

export const createCartoon = (
  _: unknown,
  args: { cartoon: Cartoon }
): number => {
  // Extraction des personnages et conservation du reste des propriétés
  const { personnages, ...rest } = args.cartoon;

  // Ajout d'un ID (number) unique pour chaque nouveau personnage
  const newPersonnages = personnages.map((pers) => ({
    ...pers,
    id: Date.now(), // ID as Timestamp
  }));

  const id = cartoons[cartoons.length - 1].id + 1; // ID incrementation du dernier ID du tableau
  const newCartoon: Cartoon = {
    ...rest,
    personnages: newPersonnages,
    id,
  };

  cartoons.push(newCartoon);
  return id;
};

export const deleteCartoon = (_: unknown, args: { id: number }): boolean => {
  const index = cartoons.findIndex((cartoon) => cartoon.id === args.id);
  if (index === -1) return false;

  cartoons.splice(index, 1);
  return true;
};
