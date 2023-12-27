import { Request, Response } from "express";
import {
  get1ChannelServices,
  addChannelServices,
  deleteChannelServices,
  getAllChannelServices,
} from "../services/channelServices";

export const addChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = req.body;
    const channel = await addChannelServices(body);
    res.status(201).json({ message: "Channel Added Successfully", channel });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSingleChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.params;
    const channel = await get1ChannelServices(name);
    if (!channel) {
      res.status(404).json({ message: "Channel not found " });
    }

    res.status(200).json({ message: "Channel Retreive Sucessfully", channel });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllChannel = async (
  res: Response
): Promise<void> => {
  try {
    const channels = await getAllChannelServices();
    if (!channels) {
      res.status(404).json({ message: "Channel not found " });
    }
    res
      .status(200)
      .json({ message: "Channels Retreive Sucessfully", channels });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const channel = await deleteChannelServices(+id);
    if (!channel) {
      res.status(404).json({ message: "Channel not found " });
    }
    res.status(200).json({ message: "Channels Deleted Sucessfully", channel });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
