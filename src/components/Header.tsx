import { Link, useLocation } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links: { label: string; href: string }[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/characters",
    label: "Characters",
  },
  {
    href: "/episodes",
    label: "Episodes",
  },
  {
    href: "/locations",
    label: "Locations",
  },
];

export default function Header() {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)")
        const closeNav = ({matches}: MediaQueryListEvent) => {
            if(matches)
            {
                document.body.classList.remove('overflow-hidden')
                setOpen(false)
            }
        }
        mql.addEventListener("change", closeNav)
        console.log('location changes')
        return () => {mql.removeEventListener('change', closeNav)}
    }, [])

    useEffect(() => {
        document.body.classList.remove('overflow-hidden')
        setOpen(false)
    }, [location])

  return (
    <header className="bg-primary text-background">
      <ContentContainer className="flex-row justify-between items-center relative bg-inherit">
        <div className="py-2">WebApp</div>
        <nav className="bg-inherit">
          <ul className={cn("flex flex-col absolute bg-inherit left-0 top-full h-[calc(100vh_-_40px)] w-1/2 md:top-0 md:h-auto md:static md:flex-row", {"hidden": !open}, {"md:flex": true})}>
            {links.map(({ href, label }) => (
              <li key={label}>
                <Link className="py-2 block px-5 md:px-3" to={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button className="md:hidden" onClick={() => {setOpen(state => !state); document.body.classList.toggle('overflow-hidden')}}><Menu /></Button>
      </ContentContainer>
    </header>
  );
}
