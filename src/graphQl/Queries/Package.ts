import { GraphQLInt, GraphQLList } from "graphql";
import * as packageServices from "../../services/packServices";
import { Package } from "../../entity/Package";
import { PackageType } from "../TypeDefs/Package";

export const GET_PACKAGE = {
  type: PackageType,
  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parents: any, args: Package) {
    return await packageServices.get1PackageServices(args.id);
  },
};

export const GET_ALL_PACKAGE = {
  type: new GraphQLList(PackageType),

  async resolve(parents: any, args: Package) {
    return await packageServices.getAllPackageServices();
  },
};
