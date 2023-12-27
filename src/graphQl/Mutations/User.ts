import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import * as userServices from "../../services/roleServices";
import { User } from "../../entity/User";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
  type: UserType,

  args: {

    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    mobile_number: { type: GraphQLString },
    role: { type: GraphQLString },
    active: { type: GraphQLBoolean },
  },

  async resolve(parent: any, args: User) {
    try {
      const newUser =await userServices.registerService(
        args.name,
        args.email,
        args.mobile_number,
        args.password,
        args.role,
        args.active
      );
      return newUser;
    } catch (error) {
      return {};
    }
  },
};

export const DELETE_USER = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parents: any, args: User) {
    try {
      await userServices.deleteUserService(args.id);
    } catch (error) {
      return "user not deleted";
    }
    return "user deleted successfully";
  },
};
