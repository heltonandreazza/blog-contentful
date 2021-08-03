import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { BlogCategory, BlogCategoryItem } from '../components/BlogCategory'
import { BlogCard, BlogColunCards } from '../components/BlogColunCards'
import BlogPagination from '../components/BlogPagination'
import Footer from '../components/Footer'
import Navigator from '../components/Navigator'
import Seo from '../components/Seo'

const Blog = ({ data, pageContext }) => {
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const pages = Array.from({ length: pageContext.numPages })
  return (
    <div>
      <Seo title={`Blog Academia Cultural ${pageContext.title}`} />
      <Navigator
        onClickOpenMenuMobile={() => setShowMenuMobile(true)}
        onClickCloseMenuMobile={() => setShowMenuMobile(false)}
        showMenuMobile={showMenuMobile}
      />
      <main>
        <BlogColunCards title={pageContext.title} description="Postagens mais recentes">
          {data.posts.edges.slice(0, 3).map(({ node }) => (
            <BlogCard
              title={node.title}
              imageUrl={node.featuredImage.gatsbyImageData}
              categoryName={node.categories?.map((c) => c.category).join('/')}
              href={node.slug}
              description={node.description}
              authorName={node.author?.name}
              authorImageUrl={node.author?.image.gatsbyImageData}
              authorHref={node.author?.url}
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
            />
          ))}
        </BlogCategory>
        <BlogPagination
          currentPage={pageContext.currentPage}
          pagesLength={pages.length}
          prefix={pageContext.slug}
        />
      </main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!, $slug: String!) {
    posts: allContentfulPost(
      limit: $limit
      skip: $skip
      filter: { visible: { eq: true }, categories: { elemMatch: { slug: { eq: $slug } } } }
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
            url
          }
        }
      }
      totalCount
    }
  }
`

export default Blog
