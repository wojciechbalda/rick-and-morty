import ContentContainer from "@/components/ContentContainer";
import H1 from "@/components/H1";
import { Link } from "react-router-dom";

export function Component()
{
    return <ContentContainer>
        <H1>Lorem ipsum dolor sit ame</H1>
        <p className="text-center text-balance text-muted-foreground">W świecie pełnym aplikacji mobilnych i internetowych, fani popularnych seriali animowanych poszukują narzędzi, które umożliwią im jeszcze głębsze zanurzenie się w ukochanym uniwersum. Jednym z takich narzędzi jest aplikacja dedykowana serialowi "Rick and Morty", która pozwala użytkownikom sprawdzać różnorodne informacje związane z tą kultową produkcją.</p>
        <h2 className="text-center font-bold text-3xl">Sections</h2>
        <div className="grid gap-5">
            <Card href="/characters" text="Characters" />
            <Card href="/episodes" text="Episodes" />
            <Card href="/locations" text="Locations" />
        </div>
    </ContentContainer>
}

function Card({text, href}: {text: string, href: string})
{
    return <Link to={href} className="flex items-center justify-center bg-primary hover:bg-rose-500 p-5 rounded-2xl text-white">
        {text}
    </Link>
}