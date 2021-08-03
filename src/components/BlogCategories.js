import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

export const BlogCategoriesItem = ({ category, image, slug }) => (
  <Link
    to={`/blog${slug}`}
    className="h-40 w-40 bg-green-100 border border-transparent shadow rounded-lg flex flex-col items-center justify-center mr-4 text-green-600 hover:bg-green-500 hover:text-white"
  >
    <GatsbyImage className="h-14 w-14" image={image} />
    <h1 className="text-lg pt-2">{category}</h1>
  </Link>
)

const BlogCategories = ({ children }) => (
  <div className="container mx-auto py-8">
    <h1 className="py-4 text-lg font-medium">Buscar por categorias</h1>
    <div className="flex flex-nowrap overflow-x-auto">{children}</div>
  </div>
)

export default BlogCategories
