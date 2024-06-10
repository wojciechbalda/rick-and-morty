import { cn } from "@/lib/utils"

type ContentContainerProps = {
    children: React.ReactNode,
    className?: string,
}

export default function ContentContainer({ children, className }: ContentContainerProps)
{
    return <div className={cn("px-5 flex flex-col gap-5 mx-auto max-w-5xl", className)}>{children}</div>
}