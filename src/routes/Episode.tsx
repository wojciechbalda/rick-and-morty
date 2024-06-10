import ContentContainer from "@/components/ContentContainer";
import DetailCard from "@/components/DetailCard";
import ErrorPage from "@/components/ErrorPage";
import GalleryWithCharacters from "@/components/GalleryWithCharacters";
import H1 from "@/components/H1";
import useEpisode from "@/hooks/useEpisode";
import {  Calendar, Video } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

export function Component() {
  const { episode } = useParams();

  if (episode && !isNaN(Number(episode))) {
    return <EpisodeInfoBox id={Number(episode)} />;
  }

  return <Navigate to="/episodes" replace />;
}

type EpisodeInfoBoxProps = {
  id: number;
};

function EpisodeInfoBox({ id }: EpisodeInfoBoxProps) {
  const obj = useEpisode(id);

  if (obj.isError) return <ErrorPage />;
  if (obj.isSuccess) {
    const { air_date, characters, episode, name } = obj.data;
    return (
      <ContentContainer className="items-center">
        <H1>{name}</H1>
        <div>
          <DetailCard
            value={air_date}
            property="Release date:"
            Icon={Calendar}
          />
          <DetailCard value={episode} property="Release date:" Icon={Video} />
        </div>
        {characters?.length !== 0 && <div className="grid gap-5">
          <h2 className="text-center font-bold text-3xl">Characters</h2>
          <GalleryWithCharacters characters={characters} />
        </div>}
      </ContentContainer>
    );
  }
}

