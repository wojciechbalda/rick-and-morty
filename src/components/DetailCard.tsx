import { LucideProps } from "lucide-react"

type DetailCardProps = {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    property: string,
    value: string
}

export default function DetailCard({Icon, property, value}: DetailCardProps)
{
    return <div className="flex gap-2"><Icon /><span>{property}:{" "}{value}</span></div>
}