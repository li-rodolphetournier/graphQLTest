import { default as cartoons } from "../../dataset.json";
import { Cartoon } from "../types/cartoon.type";

const getOneCartoonById = (): Cartoon => {
  return cartoons[0] as Cartoon;
};

export { getOneCartoonById };
