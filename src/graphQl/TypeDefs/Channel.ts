import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const ChannelType = new GraphQLObjectType({
  name: "Channel",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
