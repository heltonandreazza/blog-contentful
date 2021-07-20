import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import '../styles/global.css'
import { BlogColunCards, BlogCard } from '../sections/BlogColunCards'
import NewsLetter from '../sections/NewsLetter'
import { BlogCategory, BlogCategoryItem } from '../sections/BlogCategory'
import Footer from '../sections/Footer'
import header1 from '../assets/header.gif'
import header2 from '../assets/header2.png'

const POSTS_QUERY = graphql`
{
  posts: allContentfulPost(filter: {visible: {eq: true}}) {
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
  esporte: allContentfulPost(filter: {visible: {eq: true}, categories: {elemMatch: {category: {eq: "Esporte"}}}}) {
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
  esporte: allContentfulPost(filter: {visible: {eq: true}, categories: {elemMatch: {category: {eq: "Esporte"}}}}) {
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
  saude: allContentfulPost(filter: {visible: {eq: true}, categories: {elemMatch: {category: {eq: "Saúde"}}}}) {
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

const Index = () => {
  const data = useStaticQuery(POSTS_QUERY)
  return (
    <div>
      {/* <h1>Contenful Blog</h1> */}
      {/* <pre>{JSON.stringify(data.posts.edges, null, 2)}</pre> */}
      {/* {
        data.posts.edges.map((post) => {
          return (
            <h2><Link to={post.node.slug}>{post.node.title}</Link></h2>
          )
        })
      } */}
      <div>
        <img src={header2} />
      </div>
      <BlogColunCards>
        {
          data.posts.edges.map(({ node }) => (
            <BlogCard
              title={node.title}
              imageUrl={node.featuredImage.gatsbyImageData}
              categoryHref={node.categories[0]?.slug}
              categoryName={node.categories[0]?.category}
              href={node.slug}
              description={node.description}
              authorName={node.author?.name}
              authorImageUrl={node.author?.image.gatsbyImageData}
              authorHref={node.author?.url}
              datetime={node.createdAt}
              date={new Date(node.createdAt).toLocaleDateString()}
              readingTime={node.readTime}   
            />
          ))
        }
      </BlogColunCards>
      <BlogCategory title={'Saúde'}>
        {
          data.saude.edges.map(({ node }) => (
            <BlogCategoryItem
              title={node.title}
              datetime={node.createdAt}
              date={new Date(node.createdAt).toLocaleDateString()}
              description={node.description}
              href={node.slug}
            />
          ))
        }      
      </BlogCategory>
      <BlogCategory title={'Esporte'}>
        {
          data.esporte.edges.map(({ node }) => (
            <BlogCategoryItem
              title={node.title}
              datetime={node.createdAt}
              date={new Date(node.createdAt).toLocaleDateString()}
              description={node.description}
              href={node.slug}
            />
          ))
        }      
      </BlogCategory>
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Index