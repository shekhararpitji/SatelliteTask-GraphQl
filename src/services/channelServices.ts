import { Channel } from "../entity/Channel";

import { appDataSource } from "../dataSource";
const curr_Channel = appDataSource.getRepository(Channel);

export const addChannelServices = async (body: Channel) => {
  const channel = curr_Channel.create(body);
  const savedChannel = await curr_Channel.save(channel);
  return savedChannel;
};

export const get1ChannelServices = async (name: string) => {
  const channel = await curr_Channel.findOneBy({
    name,
  });
  return channel;
};

export const getAllChannelServices = async () => {
  const channel = await curr_Channel.find();
  return channel;
};

export const deleteChannelServices = async (id: number) => {
  const channel = await curr_Channel.delete({
    id,
  });
  return channel;
};
