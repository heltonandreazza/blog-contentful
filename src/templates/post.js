import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navigator from '../components/Navigator'
import Seo from '../components/Seo'
import '../styles/global.css'

const buildOptions = (currentUrl) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="text-gray-900 font-bold">{text}</strong>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="mt-16 mb-12 text-6xl font-bold">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="mt-14 mb-8 text-4xl font-bold">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h2 className="mt-10 mb-6 text-2xl font-bold">{children}</h2>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h2 className="mt-8 mb-4 text-xl font-bold">{children}</h2>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h2 className="mt-6 mb-2 text-lg font-bold">{children}</h2>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h2 className="mt-4 text-sm font-bold">{children}</h2>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mt-8 text-xl text-gray-500 leading-8">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node, children) => <ul className="ml-6 list-disc">{children}</ul>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="text-gray-300">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 pl-6">
          <p className="mt-8 text-xl text-gray-900 italic leading-8">
            {node.content[0].content[0].value}
          </p>
        </blockquote>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a className="text-green-500 underline" href={node.data.uri}>
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        // eslint-disable-next-line react/destructuring-assignment
        <GatsbyImage
          className="rounded-xl mt-8"
          image={node.data.target?.fields?.gatsbyImageData}
        />
      ),
      [BLOCKS.EMBEDDED_ENTRY]: ({
        data: {
          target: { fields },
        },
        // eslint-disable-next-line consistent-return
      }) => {
        if (fields.sys.contentType.sys.id === 'emailCapture') {
          return (
            <EmailCapture
              title={fields.title}
              description={fields.description}
              ctaButton={fields.ctaButton}
              redirect={fields.redirect}
              currentUrl={currentUrl}
            />
          )
        }
      },
    },
  }
  return options
}

const EmailCapture = ({ title, description, ctaButton, redirect, currentUrl }) => {
  // eslint-disable-next-line no-return-assign
  const doRedirect = () => (window.location = redirect)
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={doRedirect} type="button">
        {ctaButton}
      </button>
      <p>{currentUrl}</p>
    </div>
  )
}

const Post = ({ data: { contentfulPost: post } = {}, path }) => {
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const contentRichJson = JSON.parse(post.contentRich.raw)

  // workaround: add image from 'references' since we have an issue where
  // we dont have the file data in the embedded asset nodes
  post.contentRich.references.forEach((ref) => {
    const node = contentRichJson?.content.find(
      // eslint-disable-next-line comma-dangle
      (n) => n?.data?.target?.sys?.id === ref.contentful_id
    )
    if (node) {
      node.data.target.fields = { ...ref }
    }
  })

  return (
    <div>
      <Seo title={`Blog Academia Cultural ${post?.title}`} />
      <Navigator
        onClickOpenMenuMobile={() => setShowMenuMobile(true)}
        onClickCloseMenuMobile={() => setShowMenuMobile(false)}
        showMenuMobile={showMenuMobile}
      />
      <div className="relative py-16 bg-white overflow-hidden">
        <AbsoluteBlock />
        <div className="container container mx-auto relative px-6 lg:px-64 2xl:px-80">
          <figure className="mx-auto">
            <GatsbyImage
              className="h-80 w-full object-cover rounded-xl my-8"
              image={post.featuredImage.localFile.childImageSharp.gatsbyImageData}
            />
          </figure>
          <div className="text-lg">
            <h1>
              <a
                className="block text-base text-center text-green-600 font-semibold tracking-wide uppercase"
                href={`/blog${post.categories[0]?.slug}`}
              >
                {post.categories[0]?.category}
              </a>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {post?.title}
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
              nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci
              at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
            <div>{documentToReactComponents(contentRichJson, buildOptions(path))}</div>
          </div>
        </div>
      </div>
      <Author author={post.author} />
      <Disqus
        className="container mx-auto px-6 lg:px-14 2xl:px-40"
        config={{
          url: `https://blog-contentful-ha.netlify.app${path}`,
          identifier: post.slug,
          title: post.title,
        }}
      />
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    contentfulPost(visible: { eq: true }, slug: { eq: $slug }) {
      title
      categories {
        category
        slug
      }
      author {
        bio {
          childMarkdownRemark {
            html
          }
        }
        image {
          gatsbyImageData
        }
        createdAt
        name
        urlInstagram
        urlLinkedin
        post {
          id
        }
        frase
        role
      }
      featuredImage {
        localFile {
          childImageSharp {
            gatsbyImageData
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

const AbsoluteBlock = () => (
  <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
    <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
      <svg
        className="absolute top-12 left-full transform translate-x-32"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
      </svg>
      <svg
        className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="f210dbf6-a58d-4871-961e-36d5016a0f49"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
      </svg>
      <svg
        className="absolute bottom-12 left-full transform translate-x-32"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="d3eb07ae-5182-43e6-857d-35c643af9034"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
      </svg>
    </div>
  </div>
)

const Author = ({ author }) => {
  return (
    <div className="relative bg-white py-16 sm:py-24">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Testimonial card */}
            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
              <GatsbyImage
                className="absolute inset-0 h-full w-full object-cover"
                image={author.image.gatsbyImageData}
              />
              <div className="absolute inset-0 bg-green-500 mix-blend-multiply opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-green-600 opacity-50" />
              <div className="relative px-8">
                <blockquote className="mt-8">
                  <div className="relative text-lg font-medium text-white md:flex-grow">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">{author.frase}</p>
                  </div>

                  <footer className="mt-4">
                    <p className="text-base font-semibold text-green-200">
                      {author.name}, {author.role} na Academia Cultural
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <a href={author.urlInstagram}>
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl flex items-center hover:text-green-600">
                {author.name}
                <div className="text-green-400 hover:text-green-600 ml-4">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </h2>
            </a>
            <div
              className="mt-6 text-gray-500 space-y-6 text-lg"
              dangerouslySetInnerHTML={{ __html: author.bio.childMarkdownRemark.html }}
            />
          </div>
          {/* Stats section */}
          <div className="mt-8">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              <div key="Desde" className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Desde</dt>
                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {author.createdAt?.split('-')[0]}
                </dd>
              </div>
              <div key="Postagens" className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Postagens</dt>
                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {author.post?.length}
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <a href="/authors" className="text-base font-medium text-green-600">
                {' '}
                Conheça a nossa equipe <span aria-hidden="true">&rarr;</span>{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
