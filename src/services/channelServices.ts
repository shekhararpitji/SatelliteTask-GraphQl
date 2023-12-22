const { Channel } = require("../entity/Channel");

import { Request } from "express";
import { appDataSource } from "../dataSource";
const curr_Channel = appDataSource.getRepository(Channel);

export const get1ChannelServices = async (req:Request) => {
  const { name } = req.params;
  const channel = await curr_Channel.findOneBy({
   
      name,
    
  });
  return channel;
};

export const addChannelServices = async (req:Request) => {
  const body = req.body;

  const channel = await curr_Channel.create(
   body
  );

      const savedChannel=await curr_Channel.save(channel)
  return savedChannel;
};

export const deleteChannelServices = async (req:Request) => {
  const { id } = req.params;
  const channel = await curr_Channel.delete({
   
      id: id,
   
  });
  return channel;
};
