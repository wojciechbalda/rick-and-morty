import { Navigate, useParams } from "react-router-dom"
import CharacterInfoBox from "../components/CharacterInfoBox"

export function Component()
{
    const { character } = useParams()

    if (character && !isNaN(Number(character)))
    {
        return <CharacterInfoBox id={Number(character)} />
    }
        
    return <Navigate to="/characters" replace />
}