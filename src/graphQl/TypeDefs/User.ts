import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { SubscribeType } from "./Subscription";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    mobile_number: { type: GraphQLString },
    role: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    subscription:{type:new GraphQLList(SubscribeType)}
  }),
});
