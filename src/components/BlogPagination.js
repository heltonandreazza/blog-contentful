import { Link } from 'gatsby'
import React from 'react'

const BlogPaginationItem = ({ children, className: cn }) => (
  <li
    className={`hidden sm:flex p-4 mx-2 bg-green-400 text-white rounded-lg hover:bg-green-800 ${
      cn || ''
    }`}
  >
    {children}
  </li>
)
const BlogPagination = ({ currentPage, pagesLength, prefix = '' }) => (
  <ul className="container mx-auto my-4 flex items-center justify-center">
    <BlogPaginationItem>
      <Link to={`/blog${prefix}${currentPage <= 1 ? '' : `/${currentPage - 1}`}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
    </BlogPaginationItem>
    {Array.from({ length: pagesLength }).map((_, i) => (
      <BlogPaginationItem className={currentPage === i ? 'bg-green-800' : ''}>
        <Link to={`/blog${prefix}${i === 0 ? '' : `/${i}`}`}>{i + 1}</Link>
      </BlogPaginationItem>
    ))}
    <BlogPaginationItem>
      <Link
        to={`/blog${prefix}${
          currentPage >= pagesLength - 1 ? `/${currentPage}` : `/${currentPage + 1}`
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </BlogPaginationItem>
  </ul>
)

export default BlogPagination
