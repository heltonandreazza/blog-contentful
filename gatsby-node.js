const path = require('path')

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions

  /** CREATE POSTS PAGES */
  // fetch pages from gatsby-source-contentful graphql
  const responsePosts = await graphql(`
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
  `)
  // create pages
  const postTemplate = path.resolve('src/templates/post.js')
  responsePosts.data.posts.edges.forEach(post => {
    createPage({
      path: post.node.slug,
      component: postTemplate,
      context: {
        slug: post.node.slug
      }
    })
  })
  /** */
}