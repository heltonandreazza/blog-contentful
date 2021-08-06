import { graphql } from 'gatsby'
import React, { useState } from 'react'
import banner from '../assets/banner.png'
import BlogCategories, { BlogCategoriesItem } from '../components/BlogCategories'
import { BlogCategory, BlogCategoryItem } from '../components/BlogCategory'
import { BlogCard, BlogColunCards } from '../components/BlogColunCards'
import BlogPagination from '../components/BlogPagination'
import Footer from '../components/Footer'
import Navigator from '../components/Navigator'
import Seo from '../components/Seo'
import '../styles/global.css'

const Blog = ({ data, pageContext }) => {
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const pages = Array.from({ length: pageContext.numPages })
  return (
    <div>
      <Seo title="Blog Academia Cultural" />
      <Navigator
        onClickOpenMenuMobile={() => setShowMenuMobile(true)}
        onClickCloseMenuMobile={() => setShowMenuMobile(false)}
        showMenuMobile={showMenuMobile}
      />
      <main>
        <div className={`${pageContext.currentPage <= 0 ? '' : 'hidden'} mx-4 2xl:mx-80`}>
          <div className="relative container mx-auto bg-green-500 flex items-center justify-between border border-transparent rounded-xl">
            <h1 className="absolute left-14 top-16 text-xl sm:text-4xl text-white  font-bold pb-2">
              Dicas e conteúdos exclusivos
            </h1>
            <h1 className="absolute left-14 top-28 text-xl sm:text-4xl text-white font-bold pb-2">
              com os nossos professores!
            </h1>
            <p className="absolute left-14 top-40 text-lg sm:text-xl text-white font-medium py-2">
              Compartilhe saúde com seus amigos!
            </p>
            <img className="h-64 w-full object-cover rounded-xl" src={banner} />
          </div>
        </div>
        <div className={`${pageContext.currentPage <= 0 ? '' : 'hidden'} mx-4 2xl:mx-80`}>
          <BlogCategories>
            {data.categories.edges.map(({ node }) => (
              <BlogCategoriesItem
                category={node.category}
                image={node.image.gatsbyImageData}
                slug={node.slug}
              />
            ))}
          </BlogCategories>
        </div>
        <BlogColunCards
          title="Postagens mais recentes"
          description="Saúde, disposição, felicidade e muito mais."
        >
          {data.posts.edges.slice(0, 3).map(({ node }) => (
            <BlogCard
              title={node.title}
              imageUrl={node.featuredImage.gatsbyImageData}
              categoryName={node.categories?.map((c) => c.category).join('/')}
              href={node.slug}
              description={node.description}
              authorName={node.author?.name}
              authorImageUrl={node.author?.image.gatsbyImageData}
              authorHref={node.author?.urlInstagram}
              datetime={node.createdAt}
              date={new Date(node.createdAt).toLocaleDateString()}
              readingTime={node.readTime}
            />
          ))}
        </BlogColunCards>
        <BlogCategory>
          {data.posts.edges.slice(3, 9).map(({ node }) => (
            <BlogCategoryItem
              imageUrl={node.featuredImage.gatsbyImageData}
              title={node.title}
              datetime={node.createdAt}
              date={new Date(node.createdAt).toLocaleDateString()}
              description={node.description}
              href={node.slug}
              authorName={node.author?.name}
              authorImageUrl={node.author?.image.gatsbyImageData}
              authorHref={node.author?.urlInstagram}
              readingTime={node.readTime}
            />
          ))}
        </BlogCategory>
        <BlogPagination currentPage={pageContext.currentPage} pagesLength={pages.length} />
      </main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    posts: allContentfulPost(
      limit: $limit
      skip: $skip
      filter: { visible: { eq: true } }
      sort: { order: DESC, fields: createdAt }
    ) {
      edges {
        node {
          title
          slug
          description
          createdAt
          updatedAt
          featuredImage {
            gatsbyImageData
          }
          categories {
            category
            slug
          }
          readTime
          author {
            name
            image {
              gatsbyImageData
            }
            urlInstagram
          }
        }
      }
      totalCount
    }
    categories: allContentfulPostCategory {
      edges {
        node {
          category
          image {
            gatsbyImageData
          }
          slug
        }
      }
    }
  }
`

export default Blog
