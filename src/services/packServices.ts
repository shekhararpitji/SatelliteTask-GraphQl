import { Package } from "../entity/Package";
import { appDataSource } from "../dataSource";
const curr_Package = appDataSource.getRepository(Package);

export const addPackageServices = async (  name:string, category:string, duration:string, price:number ) => {

  const pack = curr_Package.create({ name, category, duration, price });

  const savedPackage = await curr_Package.save(pack);
  return savedPackage;
};

export const get1PackageServices = async (id: number) => {
  const pack = await curr_Package.findOneBy({
    id,
  });
  return pack;
};

export const getAllPackageServices = async () => {
  const pack = await curr_Package.find();
  return pack;
};

export const deletePackageServices = async (id: number): Promise<void> => {
  await curr_Package.delete({ id });
};
