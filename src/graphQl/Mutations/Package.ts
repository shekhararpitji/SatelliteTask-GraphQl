import { GraphQLInt, GraphQLString } from "graphql";
import * as packageServices from "../../services/packServices";
import { Package } from "../../entity/Package";
import { PackageType } from "../TypeDefs/Package";

export const CREATE_PACKAGE = {
  type: PackageType,

  args: {
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    duration: { type: GraphQLString },
    price: { type: GraphQLInt },
  },

  async resolve(parent: any, args: Package) {
    return await packageServices.addPackageServices(
      args.name,
      args.category,
      args.duration,
      args.price
    );
  },
};

export const DELETE_PACKAGE = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent: any, args: Package) {
    await packageServices.deletePackageServices(args.id);
    return "package deleted successfully";
  },
};
