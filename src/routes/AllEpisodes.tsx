import Card from "@/components/Card";
import ContentContainer from "@/components/ContentContainer";
import FilterEpisodeForm from "@/components/FilterEpisodeForm";
import H1 from "@/components/H1";
import Pagination from "@/components/Pagination";
import SearchingAlert from "@/components/SearchingAlert";
import { episodeKeys } from "@/keys";
import { getAllEpisodes } from "@/queries";
import { Episode } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function Component() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  let newParams = {};
  const params = { name: searchParams.get("name") };

  for (const [key, value] of Object.entries(params)) {
    if (value) newParams = { ...newParams, [key]: value };
  }

  const { isError, data, isPlaceholderData } = useQuery({
    queryKey: episodeKeys.episodesPage(page, newParams),
    queryFn: getAllEpisodes,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  if (data) {
    return (
      <>
        <ContentContainer>
          <SearchingAlert isPlaceholderData={isPlaceholderData} />
          <H1>Episodes</H1>
          <FilterEpisodeForm />
          <div className="grid grid-cols-4 gap-3">
            {data.results?.map(({ air_date, id, name, episode }) => (
              <EpisodeCard air_date={air_date} episode={episode} id={id} name={name} key={id} />
            ))}
          </div>
          <Pagination pages={Number(data.info?.pages) || 1} />
        </ContentContainer>
      </>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <div>Loading...</div>;
}

type EpisodeCardProps = Pick<Episode, "id" | "air_date" | "episode" | "name">;

function EpisodeCard({ id, air_date, episode, name }: EpisodeCardProps) {
  return (
    <Card id={id}>
      <p>Name: {name}</p>
      <p>Episode: {episode}</p>
      <p>Release date: {air_date}</p>
    </Card>
  );
}