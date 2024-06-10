import { cn } from "@/lib/utils"

type H1Props = {
    children: React.ReactNode,
    className?: string,
}

export default function H1({ children, className }: H1Props)
{
    return <h1 className={cn('font-bold text-5xl text-balance text-center', className)}>{children}</h1>
}