import { ChannelType } from "../TypeDefs/Channel";
import { GraphQLList, GraphQLString } from "graphql";
import { Channel } from "../../entity/Channel";
import * as channelServices from "../../services/channelServices";

export const GET_SINGLE_CHANNEL = {
  type: ChannelType,

  args: {
    name: { type: GraphQLString },
  },

  async resolve(parent: any, args: Channel) {
    return await channelServices.get1ChannelServices(args.name);
  },
};

export const GET_ALL_CHANNEL = {
  type: new GraphQLList(ChannelType),

  async resolve() {
    return await channelServices.getAllChannelServices();
  },
};
