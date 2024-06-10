import Card from "@/components/Card";
import ContentContainer from "@/components/ContentContainer";
import FilterLocationForm from "@/components/FilterLocation";
import H1 from "@/components/H1";
import Pagination from "@/components/Pagination";
import SearchingAlert from "@/components/SearchingAlert";
import { locationKeys } from "@/keys";
import { getAllLocations } from "@/queries";
import { Location } from "@/types";
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
    queryKey: locationKeys.locationsPage(page, newParams),
    queryFn: getAllLocations,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  if (data) {
    return (
      <>
        <ContentContainer>
          <SearchingAlert isPlaceholderData={isPlaceholderData} />
          <H1>Locations</H1>
          <FilterLocationForm />
          <div className="grid grid-cols-4 gap-3">
            {data.results?.map(({ name, id }) => (
              <LocationCard id={id} name={name} key={id} />
            ))}
          </div>
          <Pagination pages={Number(data.info?.pages) || 1} />
        </ContentContainer>
      </>
    );
  }

  if (isError) {
    return <ContentContainer>
      <H1>Error</H1>
    </ContentContainer>;
  }

  return <div>Loading...</div>;
}

type LocationCardProps = Pick<Location, 'name' | 'id'>

function LocationCard({id, name}: LocationCardProps)
{
  return <Card id={id}>
    <p>{name}</p>
  </Card>
}