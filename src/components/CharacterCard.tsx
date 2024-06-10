import { Character } from "@/types";
import Card from "./Card";

type CharacterCardProps = Pick<Character, "id" | "image" | "name" | "gender">;

export default function CharacterCard({ gender, id, image, name }: CharacterCardProps) {
  return (
    <Card id={id}>
      <div className="w-full aspect-square">
        <img className="w-full h-full object-cover object-center" src={image} />
      </div>
      <div>
        <h2>Name: {name}</h2>
        <p>Gender: {gender}</p>
      </div>
    </Card>
  );
}