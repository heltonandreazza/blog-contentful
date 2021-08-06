const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // fetch pages from gatsby-source-contentful graphql
  const response = await graphql(`
    {
      posts: allContentfulPost(filter: { visible: { eq: true } }) {
        edges {
          node {
            slug
            categories {
              category
              slug
            }
          }
        }
      }
      categories: allContentfulPostCategory {
        edges {
          node {
            category
            slug
          }
        }
      }
    }
  `)

  /** CREATE POSTS PAGES */
  const postTemplate = path.resolve('src/templates/post.js')
  response.data.posts.edges.forEach((post) => {
    createPage({
      path: post.node.slug,
      component: postTemplate,
      context: {
        slug: post.node.slug,
      },
    })
  })
  /** */

  /** CREATE BLOG PAGES */
  // pagination
  const pageSizeBlog = 10
  const totalPostsBlog = response.data.posts.edges.length
  const numPagesBlog = Math.ceil(totalPostsBlog / pageSizeBlog)
  const templateBlog = path.resolve('src/templates/blog.js')

  Array.from({ length: numPagesBlog }).forEach((_, i) => {
    createPage({
      path: `/blog${i === 0 ? '' : `/${i}`}`,
      component: templateBlog,
      context: {
        limit: pageSizeBlog,
        skip: i * pageSizeBlog,
        numPages: numPagesBlog,
        currentPage: i,
      },
    })
  })
  /** */

  /** CREATE BLOG PAGES BY CATEGORY */
  const filterByCategory =
    (category) =>
    ({ node: { categories } = {} }) =>
      categories.map((c) => c.category).includes(category)

  response.data.categories.edges.forEach((item) => {
    // pagination
    const pageSizeCategory = 10
    const totalPostsCategory = response.data.posts.edges.filter(
      filterByCategory(item.node.category)
    ).length
    const numPagesCategory = Math.ceil(totalPostsCategory / pageSizeCategory)

    const templateCategory = path.resolve('src/templates/category.js')

    Array.from({ length: numPagesCategory }).forEach((_, i) => {
      createPage({
        path: `/blog${item.node.slug}${i === 0 ? '' : `/${i}`}`,
        component: templateCategory,
        context: {
          limit: pageSizeCategory,
          skip: i * pageSizeCategory,
          numPages: numPagesCategory,
          currentPage: i,
          title: item.node.category,
          slug: item.node.slug,
        },
      })
    })
  })
  /** */

  /** CREATE AUTHORS PAGES */
  const authorsTemplate = path.resolve('src/templates/authors.js')
  createPage({
    path: '/authors',
    component: authorsTemplate,
    context: {
      slug: '/authors',
    },
  })
  /** */
}
