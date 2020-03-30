const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(a => args.id === a.id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let link = links.find(a => a.id === args.id);
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (parent, args) => {
      const newLinks = links.filter(a => a.id !== args.id);
      links = newLinks;
      return null;
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log("Server is running on http://localhost:4000"));
