import { UniswapXAPI } from "./services/apis/UniswapXAPI";
import { GeneralUtils } from "./utils/general.util";
import {
  uniswapXDuchOrderLogger,
  uniswapXLimitOrderLogger,
} from "./utils/logger.util";

const fetchUniswapXDuchOrders = async () => {
  const startTime = Date.now();
  const orders = await UniswapXAPI.getUniswapXOrders(false);
  uniswapXDuchOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);
  console.log(
    `Fetch ${orders.length} UniswapX Duch Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

const fetchUniswapXLimitOrders = async () => {
  const startTime = Date.now();
  const orders = await UniswapXAPI.getUniswapXOrders(true);
  uniswapXLimitOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);
  console.log(
    `Fetch ${orders.length} UniswapX Limit Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

const main = async () => {
  while (true) {
    const startTime = Date.now();
    await Promise.allSettled([
      fetchUniswapXDuchOrders(),
      fetchUniswapXLimitOrders(),
    ]);
    console.log(`Took ${Date.now() - startTime}ms.\n\n`);
    await GeneralUtils.sleep(1000);
  }
};

main();
