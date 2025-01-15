type Token = {
    date: number;
    tokens: Record<string, number>;
  };
  
  type Liquidity = {
    date: number;
    totalLiquidityUSD: number;
  };
  
  type ChainData = {
    tvl: Liquidity[];
    tokens: Token[];
    tokensInUsd: unknown[]; // Replace `unknown` with the proper type if known
  };
  
  type ChainTvls = Record<string, ChainData>;
  
  type CurrentChainTvls = Record<string, number>;
  
  type Protocol = {
    id: string;
    name: string;
    url: string;
    description: string;
    logo: string;
    gecko_id: string;
    cmcId: string;
    chains: string[];
    twitter: string | null;
    github: string[] | null;
    stablecoins: string[] | null;
    currentChainTvls: CurrentChainTvls;
    chainTvls: ChainTvls;
    tokens: unknown[]; // Replace `unknown` with the proper type if known
    tokensInUsd: unknown[]; // Replace `unknown` with the proper type if known
    tvl: unknown[]; // Replace `unknown` with the proper type if known
    isParentProtocol: boolean;
    raises: unknown[]; // Replace `unknown` with the proper type if known
    metrics: Record<string, unknown>; // Adjust the value type if known
    symbol: string | null;
    treasury: unknown | null; // Replace `unknown` with the proper type if known
    mcap: number;
    otherProtocols: string[];
    hallmarks: unknown[]; // Replace `unknown` with the proper type if known
  };
  
  export type { Protocol, CurrentChainTvls, ChainTvls, ChainData, Liquidity, Token };
  