import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

export const SubscribeType = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({
    id: { type: GraphQLID },
    startDate: { type: GraphQLString },
    userId: { type: GraphQLInt },
    packId: { type: GraphQLInt },
    duration: { type: GraphQLString },
  }),
});
