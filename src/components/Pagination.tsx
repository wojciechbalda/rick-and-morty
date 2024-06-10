import { Link, useLocation, useSearchParams } from "react-router-dom"

function generatePagination(pages: number, currentPage: number): (number | "..")[]
{
    if (pages < 7)
        return Array.from({length: pages}, (_, i) => i + 1)

    if (currentPage < 4)
        return [1, 2, 3, 4, '..', pages-1, pages] 
    else if (currentPage > pages - 3)
        return [1, 2, '..', pages-3, pages-2, pages-1, pages] 
    else 
        return [1,'..',currentPage-1, currentPage, currentPage+1, '..', pages] 

}

function generateUrl(baseUrl: string, page: number | string)
{
    const segments = baseUrl.split('/')
    const correctUrl = Number.isNaN(segments[segments.length - 1]) ? segments.slice(0, -1).join('/') : segments.join('/')
    if (page === 1)
        return correctUrl
    return `${correctUrl}?page=${page}`
}

type PaginationProps = {
    pages: number,
}

export default function Pagination({pages}: PaginationProps)
{
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const paginationValues = generatePagination(pages, currentPage)
    const { pathname } = useLocation()

    return <div className="flex gap-2 justify-center">
        {paginationValues.map((value, index) => <PaginationItem key={index} href={generateUrl(pathname, value)} value={value} />)}
    </div>
}

type PaginationItemProps = {
    href: string,
    value: ".." | number
}

function PaginationItem({href, value}: PaginationItemProps)
{
    const classNames = "aspect-square w-10 flex justify-center items-center bg-primary text-white"
    if (value == '..')
        return <div className={classNames}>{value}</div>
    return <Link className={classNames} to={href}>{value}</Link>
}