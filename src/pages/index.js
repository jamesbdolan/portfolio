import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Hello! I'm James, a software engineer in Dublin">
      <p>Find the Github repository <a href="https://github.com/jamesbdolan/portfolio">here</a></p>
      <StaticImage
        alt="Me right before I got married"
        src="../images/profiler2.png"
      />
    </Layout>
  )
}

export default IndexPage