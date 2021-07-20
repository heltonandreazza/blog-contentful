import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

const POSTS_QUERY = graphql`
{
  posts: allContentfulPost(filter: {visible: {eq: true}}) {
    edges {
      node {
        spaceId
        title
        slug
        internal {
          content
          type
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
      <h1>Contenful Blog</h1>
      {/* <pre>{JSON.stringify(data.posts.edges, null, 2)}</pre> */}
      {
        data.posts.edges.map((post) => {
          return (
            <h2><Link to={post.node.slug}>{post.node.title}</Link></h2>
          )
        })
      }
    </div>
  )
}

export default Index