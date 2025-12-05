import { z } from "zod";

// This is the official schema for an Edenlayer Agent Card (based on A2A protocol)
interface AgentCard {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  pricing: {
    model: "per_request" | "per_token";
    cost: string;
    currency: "ETH" | "USDC";
  };
  endpoint: string; // The URL where this agent lives
}

// The Real "Public Agents" (Hardcoded for the demo, but structurally real)
const REGISTRY: AgentCard[] = [
  {
    id: "did:eden:agent:solidity_auditor_v1",
    name: "Solidity Auditor Pro",
    description: "Specialized AI for detecting reentrancy and overflow bugs in smart contracts.",
    capabilities: ["audit", "solidity", "security"],
    pricing: { model: "per_request", cost: "0.01", currency: "ETH" },
    endpoint: "https://agent-auditor.edenlayer.com/api/v1" 
  },
  {
    id: "did:eden:agent:frontend_scaffold",
    name: "React/NextJS Scaffolder",
    description: "Generates production-ready frontend code using RainbowKit and Wagmi.",
    capabilities: ["frontend", "react", "nextjs", "web3"],
    pricing: { model: "per_request", cost: "0.005", currency: "ETH" },
    endpoint: "https://agent-scaffolder.edenlayer.com/api/v1"
  },
  {
    id: "did:eden:agent:deployment_executor",
    name: "Thirdweb Executor",
    description: "Autonomous wallet agent capable of deploying contracts to Base, Optimism, and Polygon.",
    capabilities: ["deploy", "transaction", "wallet"],
    pricing: { model: "per_request", cost: "0.002", currency: "ETH" },
    endpoint: "https://agent-executor.edenlayer.com/api/v1"
  }
];

export const EdenSearchSchema = z.object({
  query: z.string().describe("The capability or role you are looking for (e.g. 'auditor')"),
});

export async function searchEdenlayer({ query }: z.infer<typeof EdenSearchSchema>) {
  console.log(`🔎 Heaven Architect is querying Edenlayer Registry for: "${query}"...`);
  
  // 1. Simulate Network Latency (Real discovery takes time!)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 2. Filter the Registry (Simulating a real search algorithm)
  const queryLower = query.toLowerCase();
  const matches = REGISTRY.filter(agent => 
    agent.name.toLowerCase().includes(queryLower) || 
    agent.description.toLowerCase().includes(queryLower) ||
    agent.capabilities.some(cap => cap.includes(queryLower))
  );

  if (matches.length === 0) {
    return JSON.stringify({
      status: "no_results",
      message: "No agents found matching that criteria. Try 'auditor' or 'frontend'."
    });
  }

  // 3. Return the Agent Cards (The "Resume")
  return JSON.stringify({
    status: "success",
    found_count: matches.length,
    agents: matches
  });
}