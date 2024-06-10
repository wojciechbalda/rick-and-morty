import { Link } from "react-router-dom"

type CardProps = {
    children: React.ReactNode,
    id: number
}

export default function Card({children, id}: CardProps)
{
    return <Link to={`${id}`} className="border p-2 grid gap-2 w-full">
        {children}
    </Link>
}