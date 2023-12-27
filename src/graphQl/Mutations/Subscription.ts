import { GraphQLInt } from "graphql";
import * as subscribeServices from "../../services/subscriptionServices";
import { Subscription } from "../../entity/Subscription";
import { SubscribeType } from "../TypeDefs/Subscription";

export const SUBSCRIBE_PACK = {
  type: SubscribeType,

  args: {
    userId: { type: GraphQLInt },
    packId: { type: GraphQLInt },
  },

  async resolve(parent: any, args: Subscription) {
     const newSubscription=await subscribeServices.subscribePackageService(
      args.userId,
      args.packId
    );
    return newSubscription;
  },
};
