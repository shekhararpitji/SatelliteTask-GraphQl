import { getSubscription } from "./../services/subscriptionServices";
import { Request, Response } from "express";

import {
  subscribePackageService,
  subscribeAddonService,
} from "../services/subscriptionServices";

export const subscribePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.data;
    const { packId } = req.params;
    const result = await subscribePackageService(+id, +packId);
    if (result) {
      res.json(result);
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const subscribeAddon = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.data;
    const { packId } = req.params;
    const result = await subscribeAddonService(+id, +packId, res);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getSubscriptionCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await getSubscription(+id);
    if (!subscription) {
      res.status(404).json({ message: "subscription not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
