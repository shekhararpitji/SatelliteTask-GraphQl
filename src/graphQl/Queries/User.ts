import { UserType } from "../TypeDefs/User";
import { GraphQLInt, GraphQLList } from "graphql";
import { User } from "../../entity/User";
import * as userServices from "../../services/roleServices";

export const GET_SINGLE_USER = {
  type: UserType,

  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parent: any, args: User) {
    return await userServices.get1Service(args.id);
  },
};

export const GET_ALL_USER = {
  type: new GraphQLList(UserType),

  async resolve() {
    return await userServices.getAllService();
  },
};

export const USER_SUBSCRIPTION = {
  type: UserType,

  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parent: any, args: User) {
    return await userServices.getUserwithPlans(args.id);
  },
};
