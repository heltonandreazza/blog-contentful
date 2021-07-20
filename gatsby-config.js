module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'dnsidchohq8t',
        accessToken: 'p16hP1Kh29aF2wzX4B1IxEdvB3_4BuMOgWD70OQhW6U', // Delivery API
        downloadLocal: true
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-transformer-remark'
  ]
}