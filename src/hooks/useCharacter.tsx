import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCharacter } from "../queries";
import { Character, Info } from "../types";
import { characterKeys } from "@/keys";

export default function useCharacter(characterId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: characterKeys.character(characterId),
    queryFn: getCharacter,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    initialData: () => {
      return queryClient
        .getQueryData<Info<Character[]>>(
          characterKeys.charactersPage(Math.ceil(characterId / 20), {})
        )
        ?.results?.find((character) => character.id === characterId);
    },
  });
}
