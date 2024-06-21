import ContentContainer from "@/components/ContentContainer";
import H1 from "@/components/H1";
import { Link } from "react-router-dom";

export function Component()
{
    return <ContentContainer>
        <H1>Rick and morty - website</H1>
        <p className="text-center text-balance text-muted-foreground">In a world full of mobile and online applications, fans of popular animated series are looking for tools that will enable them to immerse themselves even deeper in their beloved universe. One of such tools is an application dedicated to the "Rick and Morty" series, which allows users to check various information related to this cult production.</p>
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