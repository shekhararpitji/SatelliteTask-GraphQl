import { isValid } from './../../interfaces.td';
import { reqContext } from './../context';
import { GraphQLInt, GraphQLString } from "graphql";
import * as channelServices from "../../services/channelServices";
import { Channel } from "../../entity/Channel";
import { ChannelType } from "../TypeDefs/Channel";

export const CREATE_CHANNEL = {
  type: ChannelType,

  args: {
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    pack: { type: GraphQLInt },
  },

  async resolve(parent: any, args: Channel) {
    return await channelServices.addChannelServices(args);
  },
};

export const DELETE_CHANNEL = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parents: any, args: Channel,context:isValid) {
    await channelServices.deleteChannelServices(args.id);
    return "channel deleted successfully";
  },
};
