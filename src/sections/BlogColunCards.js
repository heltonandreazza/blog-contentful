import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"

export const BlogCard = ({
  title,
  imageUrl,
  categoryHref,
  categoryName,
  href,
  description,
  authorImageUrl,
  authorHref,
  authorName,
  datetime,
  date,
  readingTime,
}) => (
  <div key={title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      {/* <img className="h-48 w-full object-cover" src={imageUrl} alt="" /> */}
      <GatsbyImage className="h-48 w-full object-cover" image={imageUrl} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-green-600">
          <a href={categoryHref} className="hover:underline">
            {categoryName}
          </a>
        </p>
        <a href={href} className="block mt-2">
          <p className="text-xl font-semibold text-gray-900">{title}</p>
          <p className="mt-3 text-base text-gray-500">{description}</p>
        </a>
      </div>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href={authorHref}>
            <span className="sr-only">{authorName}</span>
            {/* <img className="h-10 w-10 rounded-full" src={authorImageUrl} alt="" /> */}
            <GatsbyImage className="h-10 w-10 rounded-full" image={authorImageUrl} />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            <a href={authorHref} className="hover:underline">
              {authorName}
            </a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={datetime}>{date}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{readingTime} read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const BlogColunCards = ({ children }) => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Postagens mais recentes</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Saúde, disposição, felicidade e muito mais.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}