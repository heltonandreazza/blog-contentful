import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const buildOptions = currentUrl => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="eita">{children}</h1>,
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => <GatsbyImage image={node?.data?.target?.fields?.gatsbyImageData} />,
      [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: { fields } } }, children) => {
        if (fields.sys.contentType.sys.id === 'emailCapture') {
          return (
            <EmailCapture title={fields.title} description={fields.description} ctaButton={fields.ctaButton} redirect={fields.redirect} currentUrl={currentUrl} />
          )
        }
      }
    }
  }
  return options
}

const EmailCapture = ({ title, description, ctaButton, redirect, currentUrl }) => {
  const doRedirect = () => window.location = redirect
  return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <button onClick={doRedirect}>{ctaButton}</button>
        <p>{currentUrl}</p>
      </div>
    )
  }

const Post = ({ data: { contentfulPost: post } = {}, path }) => {
  const contentRichJson = JSON.parse(post.contentRich.raw)

  // workaround: add image from 'references' since we have an issue where we dont have the file data in the embedded asset nodes
  post.contentRich.references.forEach(ref => {
    const node = contentRichJson?.content.find(n => n?.data?.target?.sys?.id === ref.contentful_id)
    if (node) {
      node.data.target.fields = { ...ref }
    }
  })

  return (
    <div>
      <GatsbyImage image={post.featuredImage.localFile.childImageSharp.gatsbyImageData} />
      <h1>{post?.title}</h1>
      {/* <div contentEditable='true' dangerouslySetInnerHTML={{ __html: post?.content?.childMarkdownRemark?.html }}></div> */}
      <div>
        {documentToReactComponents(contentRichJson, buildOptions(path))}
      </div>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!){
    contentfulPost(visible: {eq: true}, slug: {eq: $slug}) {
      title
      featuredImage {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 320, width: 480, formats: WEBP)
          }
        }
      }
      contentRich {
        raw
        references {
          ... on ContentfulAsset {
            id
            file {
              url
              fileName
              contentType
            }
            contentful_id
            gatsbyImageData
          }
          ... on ContentfulEmailCapture {
            id
            contentful_id
            ctaButton
            description
            redirect
            title
            sys {
              contentType {
                sys {
                  type
                  linkType
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
export default Post