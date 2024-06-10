import useCharacter from "@/hooks/useCharacter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import CharacterCard from "./CharacterCard";

type GalleryWithCharactersProps = {
    characters: string[];
  };
  
export default function GalleryWithCharacters({ characters }: GalleryWithCharactersProps) {
    const [index, setIndex] = useState(0);
    const numberOfCharacters = characters?.length;
    console.log(characters)
    console.log(characters[index])
    const id = Number(characters[index]?.split("/")?.at(-1));
  
    const obj = useCharacter(id);
  
    const handleGetNextCharacter = () => {
      setIndex((curIndex) =>
        curIndex === numberOfCharacters - 1 ? 0 : curIndex + 1
      );
    };
  
    const handleGetPreviousCharacter = () => {
      setIndex((curIndex) =>
        curIndex === 0 ? numberOfCharacters - 1 : curIndex - 1
      );
    };
  
    return (
      <div className="flex gap-5 items-center justify-center">
        <Button onClick={handleGetPreviousCharacter}>
          <ArrowLeft color="white" />
        </Button>
        <div className="w-80">
          {obj.isError && <p>Something went wrong</p>}
          {obj.isSuccess && (
            <CharacterCard
              gender={obj.data.gender}
              id={obj.data.id}
              image={obj.data.image}
              name={obj.data.name}
            />
          )}
        </div>
        <Button onClick={handleGetNextCharacter}>
          <ArrowRight color="white" />
        </Button>
      </div>
    );
  }
  