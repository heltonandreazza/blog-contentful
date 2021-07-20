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
  //remover
  if (post?.title == 'teste') return (
    <div className="relative pb-16 sm:pb-24 lg:pb-32">
      <Navigator
        onClickOpenMenuMobile={() => {}}
        onClickCloseMenuMobile={() => {}}
        showMenuMobile={false}
      />
      <Teste />
    </div>
  )

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

const Teste = () => {
  return (
    <div className="relative py-16 bg-white overflow-hidden">
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
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-green-600 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              JavaScript for Beginners
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
            aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
            egestas fringilla sapien.
          </p>
        </div>
        <div className="mt-6 prose prose-green prose-lg text-gray-500 mx-auto">
          <p>
            Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>.
            Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
            tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.{' '}
            <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
          </p>
          <ul>
            <li>Quis elit egestas venenatis mattis dignissim.</li>
            <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
            <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
          </ul>
          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam
            porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc
            purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.
          </p>
          <h2>From beginner to expert in 30 days</h2>
          <p>
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
            Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus
            mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
            ipsum eu a sed convallis diam.
          </p>
          <blockquote>
            <p>
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
              pellentesque. Blandit amet, sed aenean erat arcu morbi.
            </p>
          </blockquote>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
          <figure>
            <img
              className="w-full rounded-lg"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
              alt=""
              width={1310}
              height={873}
            />
            <figcaption>Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
          </figure>
          <h2>Everything you need to get up and running</h2>
          <p>
            Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius orci dapibus
            volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus
            non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc,
            congue erat ac. Cras fermentum convallis quam.
          </p>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
        </div>
      </div>
    </div>
  )
}

const Navigator = ({ showMenuMobile, onClickOpenMenuMobile, onClickCloseMenuMobile }) => (
  <>
    <nav
      className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 bg-green-500"
      aria-label="Global"
    >
      <div className="flex items-center flex-1">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#">
            <span className="sr-only">Workflow</span>
            <img className="h-14 w-auto sm:h-20" src={'logo'} alt="logo" />
          </a>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
              onClick={onClickOpenMenuMobile}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden md:block md:ml-10 md:space-x-10">
          <a href="#inspiring-histories" className="font-bold text-white-500 hover:text-white-900">
            Projetos de vida!
          </a>
          <a
            href={'#'}
            target="_blank"
            className="font-medium text-white-500 hover:text-white-900"
            rel="noreferrer"
          >
            Agende agora
          </a>
          <a
            href="https://academia-cultural.kpages.online/resultadoja"
            target="_blank"
            className="font-bold text-white-500 hover:text-white-900"
            rel="noreferrer"
          >
            Exercite-se em casa
          </a>
          {/* <a href="#" className="font-medium text-white-500 hover:text-white-900">
            Blog
          </a> */}
        </div>
      </div>
      <div className="hidden md:block text-right">
        <span className="inline-flex shadow-md ring-1 ring-black ring-opacity-5">
          <a
            href={'#'}
            target="_blank"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium text-white-500 bg-white hover:bg-green-50"
            rel="noreferrer"
          >
            Entrar
          </a>
        </span>
      </div>
    </nav>
    {/* ABSOLUTE MOBILE MENU */}
    <div
      className={`${
        showMenuMobile ? '' : 'hidden'
      } absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden`}
    >
      <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="px-5 pt-4 flex items-center justify-between">
          <div>
            <img className="h-8 w-auto" src={'logo'} alt="" />
          </div>
          <div className="-mr-2">
            <button
              type="button"
              onClick={onClickCloseMenuMobile}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-2 pt-2 pb-3">
          <a
            href="#inspiring-histories"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Projetos de vida!
          </a>
          <a
            href={'#'}
            target="_blank"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            rel="noreferrer"
          >
            Agende agora
          </a>
          <a
            href="https://academia-cultural.kpages.online/resultadoja"
            target="_blank"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            rel="noreferrer"
          >
            Exercite-se em casa
          </a>
          {/* <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Blog
          </a> */}
        </div>
        <a
          href={'#'}
          target="_blank"
          className="block w-full px-5 py-3 text-center font-medium text-white-600 bg-gray-50 hover:bg-gray-100"
          rel="noreferrer"
        >
          Entrar
        </a>
      </div>
    </div>
  </>
)