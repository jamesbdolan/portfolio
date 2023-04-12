import * as React from 'react'
//import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
          data.allMdx.nodes.map((node) => (
              <article key={node.id}>
                <p>{node.frontmatter.date} <Link to={`/blog/${node.slug}`}>
                    {node.frontmatter.title}
                  </Link></p>
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
          date(formatString: "MMM DD YYYY")
          title
        }
        id
        body
        slug
      }
    }
  }
`

export default BlogPage