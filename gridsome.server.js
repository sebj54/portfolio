// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const slugify = require('slugme')

const slugReplacement = {
    replacement: '-', // replace spaces with replacement
    remove: /[^\w\s-]/g, // regex to remove characters
    lower: true,
}

module.exports = function (api) {
    api.loadSource(({ addCollection }) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    })

    api.onCreateNode(options => {
        if (options.internal.typeName === 'Post') {
            options.slug = slugify(options.title, slugReplacement)
            options.coverImage = options.coverImage || ''
        }

        return options
    })

    api.createPages(async ({
        graphql,
        createPage,
    }) => {
        const { data } = await graphql(`{
        allPost {
            edges {
                node {
                    id
                    title
                    slug
                    excerpt
                    date(format: "DD/MM/YYYY")
                    coverImage
                }
            }
        }
    }`)

        data.allPost.edges.forEach(({
            node,
        }) => {
            createPage({
                path: `/creations/${node.slug}`,
                component: './src/templates/Creation.vue',
                context: {
                    recordId: node.id,
                },
            })
        })
    })
}
