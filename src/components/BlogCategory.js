import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    description:
      'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
  },
  {
    title: 'Writing effective landing page copy',
    href: '#',
    description:
      'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
    date: 'Jan 29, 2020',
    datetime: '2020-01-29',
  },
]

export const BlogCategoryItem = ({ title, datetime, date, description, href, imageUrl }) => (
  <div key={title} className="flex">
    <div className="hidden sm:flex flex-1 px-8">
      <GatsbyImage
        className="h-48 w-full object-cover border border-transparent shadow rounded-lg"
        image={imageUrl}
      />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500 text-center sm:text-left">
        <time dateTime={datetime}>{date}</time>
      </p>
      <a href="#" className="mt-2 block text-center sm:text-left">
        <p className="text-lg font-semibold text-gray-900">{title}</p>
        <p className="mt-3 text-gray-500 text-sm">{description}</p>
      </a>
      <div className="mt-3 flex items-center justify-center sm:justify-start">
        <a href={href} className="text-base font-semibold text-green-600 hover:text-green-500">
          Continue lendo...
        </a>
      </div>
    </div>
  </div>
)

export const BlogCategory = ({ title, children }) => (
  <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-10 lg:px-8">
    <div className="relative max-w-lg mx-auto divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">{children}</div>
    </div>
  </div>
)
