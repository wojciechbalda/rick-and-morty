import { episodeKeys } from "@/keys";
import { getEpisode } from "@/queries";
import { Episode, Info } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useEpisode(episodeId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: episodeKeys.episode(episodeId),
    queryFn: getEpisode,
    staleTime: Infinity,
    initialData: () => {
      return queryClient
        .getQueryData<Info<Episode[]>>(
          episodeKeys.episodesPage(Math.ceil(episodeId / 20), {})
        )
        ?.results?.find((episode) => episode.id === episodeId);
    },
  });
}
