export const EVENT_ABI = [
    "function swap(address recipient, bool zeroForOne, int256 amountSpecified, uint160 sqrtPriceLimitX96,bytes data) external returns (int256 amount0, int256 amount1)",
    "event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)",
  ];
  export const FACTORY_ABI = [
    "function getPool(address tokenA,address tokenB,uint24 fee) external view returns (address pool)",
  ];
 export const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  
  export const POOL_ABI = [
    "function token0() public view returns (address)",
    "function token1() public view returns (address)",
    "function fee() public view returns (uint24)",
  ];