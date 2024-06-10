import { locationKeys } from "@/keys";
import { getLocation } from "@/queries";
import { Info, Location } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useLocation(locationId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getLocation,
    queryKey: locationKeys.location(locationId),
    staleTime: Infinity,
    initialData: () => {
      return queryClient
        .getQueryData<Info<Location[]>>(
          locationKeys.locationsPage(Math.ceil(locationId / 20), {})
        )
        ?.results?.find((location) => location.id === locationId);
    },
  });
}
