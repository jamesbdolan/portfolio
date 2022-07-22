import * as React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'

const ReadingPage = ({ data }) => {
  return (
    <Layout pageTitle="Thoughts on things I have read">
      {
          data.allMdx.nodes.map((node) => (
              <article key={node.id}>
                <h2>
                  <Link to={`/reading/${node.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <p>Posted: {node.frontmatter.date}</p>
              </article>
          ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMM D, YYYY")
          title
        }
        id
        body
        slug
      }
    }
  }
`

export default ReadingPage