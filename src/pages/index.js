import * as React from 'react'
import Layout from '../components/layout'
import social from '../icons/socials.json';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Hello! I'm James, a software engineer in Dublin">
      <p>
      <a key="0" href="https://linkedin.com/in/jamesbdolan" target="_blank" rel="noopener noreferrer" aria-label={`follow me on LinkedIn`}>
        <StaticImage width="42" src="../icons/linkedin.png" alt="LinkedIn" />
      </a>
      <a key="1" href="https://github.com/jamesbdolan" target="_blank" rel="noopener noreferrer" aria-label={`follow me on Github`}>
        <StaticImage width="42" src="../icons/github.png" alt="Github" />
      </a>
      </p>
      <StaticImage
        alt="Me right before I got married"
        src="../images/profiler2.png"
      />

      {/* {social.map(({ id, name, link, icon }) => (
          <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow me on ${name}`}>
            <img width="42" src={icon} alt={name} />
          </a>
      ))} */}


    </Layout>
  )
}

export default IndexPage