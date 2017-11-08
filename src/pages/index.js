import React from 'react'
import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Link from 'gatsby-link'
import graphql from 'graphql'

const IndexPage = ({ data }) => (
  <Container>
    {data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node: post }) => (
      <Card style={{marginBottom: 10}}>
        <CardBody>
          <CardTitle><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></CardTitle>
          <CardSubtitle style={{marginBottom: 10}}>{post.frontmatter.date}</CardSubtitle>
          <CardText>{post.excerpt}</CardText>
          <Link className='btn btn-primary' to={post.frontmatter.path}>Keep Reading</Link>
        </CardBody>
      </Card>
    ))}
  </Container>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
