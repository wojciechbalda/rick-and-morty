import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import H1 from "@/components/H1";
import FilterCharactersForm from "@/components/FilterCharactersForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { characterKeys } from "@/keys";
import { getAllCharacters } from "@/queries";
import ContentContainer from "@/components/ContentContainer";
import SearchingAlert from "@/components/SearchingAlert";
import CharacterCard from "@/components/CharacterCard";

export function Component() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  let newParams = {};
  const params = {
    name: searchParams.get("name"),
    status: searchParams.get("status"),
    gender: searchParams.get("gender"),
  };

  for (const [key, value] of Object.entries(params)) {
    if (value) newParams = { ...newParams, [key]: value };
  }

  const { isError, data, isPlaceholderData } = useQuery({
    queryKey: characterKeys.charactersPage(page, newParams),
    queryFn: getAllCharacters,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  if (data) {
    return (
        <ContentContainer>
          <SearchingAlert isPlaceholderData={isPlaceholderData} />
          <H1>Characters</H1>
          <FilterCharactersForm />
          <div className="grid grid-cols-4 gap-3">
            {data.results?.map(({ gender, id, image, name }) => (
              <CharacterCard
              gender={gender}
              id={id}
                image={image}
                name={name}
                key={id}
                />
              ))}
          </div>
          <Pagination pages={Number(data.info?.pages) || 1} />
        </ContentContainer>
    );
  }

  if (isError) {
    return <ContentContainer><H1>Error</H1></ContentContainer>;
  }

  return <ContentContainer><H1>Loading...</H1></ContentContainer>;
}


