import { GraphQLInt } from "graphql";
import * as subscribeServices from "../../services/subscriptionServices";
import { Subscription } from "../../entity/Subscription";
import { SubscribeType } from "../TypeDefs/Subscription";

export const GET_SUBSCRIPTION = {
  type: SubscribeType,
  args: {
    id: { type: GraphQLInt },
  },

  async resolve(parents: any, args: Subscription) {
    return await subscribeServices.getSubscription(args.id);
  },
};
