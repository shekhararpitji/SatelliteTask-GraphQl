import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const PackageType = new GraphQLObjectType({
  name: "Package",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    duration: { type: GraphQLString },
  }),
});
