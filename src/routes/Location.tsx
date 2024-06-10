import ContentContainer from "@/components/ContentContainer";
import DetailCard from "@/components/DetailCard";
import ErrorPage from "@/components/ErrorPage";
import GalleryWithCharacters from "@/components/GalleryWithCharacters";
import H1 from "@/components/H1";
import useLocation from "@/hooks/useLocation";
import { BookType, Ratio } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

export function Component() {
    const { location } = useParams();
  
    if (location && !isNaN(Number(location))) {
      return <LocationeInfoBox id={Number(location)} />;
    }
  
    return <Navigate to="/location" replace />;
  }
  
  type LocationInfoBoxProps = {
    id: number;
  };
  
  function LocationeInfoBox({ id }: LocationInfoBoxProps) {
    const obj = useLocation(id);
  
    if (obj.isError) return <ErrorPage />;
    if (obj.isSuccess) {
        console.log(obj.data)
        const { name, residents, dimension, type } = obj.data;
        console.log(name, residents, dimension, type)
      return (
        <ContentContainer className="items-center">
          <H1>{name}</H1>
          <div>
            <DetailCard
              value={dimension}
              property="Dimension"
              Icon={Ratio}
            />
            <DetailCard value={type} property="Type" Icon={BookType} />
          </div>
          {residents && residents?.length !== 0 && <div className="grid gap-5 w-full">
            <h2 className="text-center font-bold text-3xl">Characters</h2>
            <GalleryWithCharacters characters={residents} />
          </div>}
        </ContentContainer>
      );
    }
  }