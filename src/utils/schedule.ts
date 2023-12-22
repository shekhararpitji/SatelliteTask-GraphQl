import cron from "cron";
import {
  checkExpireSubscriptions,
} from "../services/subscriptionServices";

const executeSwarm = async () => {
  try {
    await checkExpireSubscriptions();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
const job = new cron.CronJob("*/59 * * * *", executeSwarm);
job.start();
