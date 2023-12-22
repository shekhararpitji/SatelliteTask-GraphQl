import { Package } from './../entity/Package';
import { Subscription } from './../entity/Subscription';
import { User} from "../entity/User";
import { appDataSource } from "../dataSource";
const curr_Subscription = appDataSource.getRepository(User);
const curr_Package = appDataSource.getRepository(Package);
const curr_User = appDataSource.getRepository(User);

export const subscribePackageService = async (userId:number, packId:number) => {
  try {
    const user = await curr_User.findOneBy({id:userId});
    const pack = await curr_Package.findOneBy({id:packId});

    if (!user || !pack) {
      throw new Error("User or Package not found");
    }

    const startDate = Date.parse(new Date());
    const subscription = await curr_Subscription.create({
      userId:userId,
      packId,
      startDate,
      duration: "yearly",
    });
   const savedSubscription= await curr_Subscription.save(subscription);

    return { success: true, savedSubscription };
  } catch (error) {
    throw new Error(`Subscription failed: ${error}`);
  }
};

export const subscribeAddonService = async (userId:number, packId:number) => {
  try {
    const user = await curr_User.findOneBy({id:userId});
    const pack = await curr_Package.findOneBy({id:packId});
    if (!user || !pack) {
      throw new Error("User or Package not found");
    }
    const startDate = Date.parse(new Date());
    const subscription = await curr_Subscription.create({
      userId,
      packId,
      startDate,
      duration: "monthly",
    });

    return { success: true, subscription };
  } catch (error) {
    throw new Error(`Subscription failed: ${error}`);
  }
};

export const checkExpireSubscriptions = async () => {
  try {
    
    const milliseconds = Date.parse(new Date());
    const oneMonthDuration = 1 * 30 * 24 * 60 * 60 * 1000;
    const oneYearDuration = 1 * 365 * 24 * 60 * 60 * 1000;
   
    const expiredYearlySubscriptions = await curr_Subscription.find({
     
        duration: "yearly",
        // startDate: {
        //   [Op.lt]: Date.parse(new Date(milliseconds - oneYearDuration)),
        // },
   
    });
    if (!expiredYearlySubscriptions) {
    } else {
      expiredYearlySubscriptions.map(async (expiredSubscription) => {
        await curr_Subscription.delete({
         
            id: expiredSubscription.id,
        
        });
      });
    }

    const expiredMonthlySubscriptions = await curr_Subscription.find({
     
        duration: "monthly",
        // startDate: {
        //   [Op.lt]: Date.parse(new Date(milliseconds - oneMonthDuration)),
        // },
      
    });
    if (!expiredMonthlySubscriptions) {
    } else {
      expiredMonthlySubscriptions.map(async (expiredSubscription:Subscription)=> {
        await curr_Subscription.delete({
            id: expiredSubscription.id,
        });
      });
    }

    return { success: true };
  } catch (error) {
    console.error(`Failed to check and expire subscriptions: ${error}`);
  }
};
