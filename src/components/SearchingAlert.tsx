import { LoaderCircle } from "lucide-react"

type SearchingAlert = {
    isPlaceholderData: boolean,
}

export default function SearchingAlert({isPlaceholderData}: SearchingAlert)
{
    if (isPlaceholderData)
        return <div className="flex items-center justify-center">Searching... <span className="animate-spin inline-block"><LoaderCircle  /></span></div>

    return null    
}