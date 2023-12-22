import { Request, Response } from "express";
import { appDataSource } from "../dataSource";

import {
  subscribePackageService,
  subscribeAddonService,
} from "../services/subscriptionServices";

export const subscribePackage = async (req:Request, res:Response) => {
  try {
    const { id } = req.body.data;
    const { packId } = req.params;
    const result = await subscribePackageService(id, +packId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
  export const subscribeAddon = async (req:Request, res:Response) => {
    try {
      const { id } = req.body.data;
      const { packId } = req.params;
      const result = await subscribeAddonService(id, +packId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

 
