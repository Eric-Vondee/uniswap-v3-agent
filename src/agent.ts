import {
  ethers,
  Finding,
  FindingSeverity,
  FindingType,
  getJsonRpcUrl,
  HandleTransaction,
  TransactionEvent,
} from "forta-agent";

import {POOL_ABI, EVENT_ABI, FACTORY_ABI, FACTORY_ADDRESS} from './constant';

const provider = new ethers.providers.JsonRpcProvider(getJsonRpcUrl());

const isUniswapPool = async (poolAddress: string) => {
  const queryPool = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const factoryContract = new ethers.Contract(
    FACTORY_ADDRESS,
    FACTORY_ABI,
    provider
  );
  let tokenA = await queryPool.token0();
  let tokenB = await queryPool.token1();
  let fee = await queryPool.fee();
  const checkAddress = await factoryContract.getPool(tokenA, tokenB, fee);
  if (poolAddress.toLowerCase() == checkAddress.toLowerCase()) return true;
  else return false;
};

const v3Handler: HandleTransaction = async (txEvent: TransactionEvent) => {
  let findingCount = 0;
  const findings: Finding[] = [];
  const filterSwapEvents = txEvent.filterLog(EVENT_ABI);


  for (const swaps of filterSwapEvents) {
  
    const { amount0, amount1 } = swaps.args;
    const getPool = await isUniswapPool(swaps.address);
    if (getPool == true) {
      findings.push(
        Finding.fromObject({
          name: "Uniswap v3 bot agent",
          description: `Detect all swaps on v3`,
          alertId: "FORTA-1",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          metadata: {
            amount0,
            amount1,
          },
        })
      );
    }
    findingCount++;
  }

  return findings;
};

export default {
  handleTransaction: v3Handler,
};
