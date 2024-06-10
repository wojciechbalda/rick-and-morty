import useCharacter from "../hooks/useCharacter"
import { BookType, Dna, MapPin, PersonStanding, Skull, TreePalm } from "lucide-react"
import ContentContainer from "./ContentContainer"
import H1 from "./H1"
import ErrorPage from "./ErrorPage"
import DetailCard from "./DetailCard"

type CharacterInfoBoxProps = {
    id: number
}

export default function CharacterInfoBox({id}: CharacterInfoBoxProps)
{
    const obj = useCharacter(id)
    
    if (obj.isError)
        return <ErrorPage />
    else if (obj.isSuccess)
    {
        const { gender, image, location, name, origin, species, status, type} = obj.data
        return <ContentContainer className="items-center">
            <H1>{name}</H1>
            <div className="aspect-square w-1/3">
                <img className="object-cover object-center w-full h-full" src={image} />
            </div>
            <div className="grid grid-cols-3 gap-10">
                <DetailCard property="Gender" value={gender} Icon={PersonStanding} />
                <DetailCard property="Location" value={location.name} Icon={MapPin} />
                <DetailCard property="Origin" value={origin.name} Icon={TreePalm} />
                <DetailCard property="Species" value={species} Icon={Dna} />
                <DetailCard property="Status" value={status} Icon={Skull} />
                <DetailCard property="Type" value={type || "No type"} Icon={BookType} />
            </div>
        </ContentContainer>
    }
    return <div>Loading..</div>
}

