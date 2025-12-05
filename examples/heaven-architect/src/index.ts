import { AiSdkAgent } from '@nullshot/agent/aisdk';
import { z } from 'zod';
import { searchEdenlayer, EdenSearchSchema } from './tools/eden';

const SYSTEM_PROMPT = `
You are the **Heaven Architect**.
Your goal is to orchestrate the construction of dApps.
`;

export class HeavenArchitect extends AiSdkAgent {
  constructor(state: DurableObjectState, env: any) {
    super(state, env);
    this.systemPrompt = SYSTEM_PROMPT;
    
    // Tools are registered here
    this.tools = [
      {
        name: "search_edenlayer",
        description: "Search Edenlayer for agents.",
        schema: EdenSearchSchema,
        execute: searchEdenlayer
      }
    ];
  }

  // 🔥 MANUAL OVERRIDE: This bypasses the internal router that was causing 404s
  async fetch(request: Request) {
    console.log(`🧠 AGENT WOKE UP! Method: ${request.method}, URL: ${request.url}`);

    // 1. Parse the incoming message
    let userMessage = "No message";
    try {
      const body: any = await request.json();
      if (body.messages) {
        userMessage = body.messages[body.messages.length - 1].content;
      }
    } catch (e) {
      console.warn("Could not parse body, using default.");
    }

    console.log(`User Wants: "${userMessage}"`);

    // 2. Generate the Plan (Mocked for stability to prove connection)
    // Once this works, we can hook up the real AI generation here.
    const architecturePlan = {
      summary: `I have analyzed your request to "${userMessage}". Here is the deployment architecture.`,
      tasks: [
        {
          title: "Smart Contract Development",
          description: "Write and audit Solidity contracts.",
          required_agent_role: "Solidity-Auditor"
        },
        {
          title: "Frontend Interface",
          description: "Scaffold Next.js dashboard with RainbowKit.",
          required_agent_role: "Frontend-Scaffolder"
        },
        {
          title: "On-Chain Deployment",
          description: "Deploy artifacts to Base Sepolia.",
          required_agent_role: "Thirdweb-Executor"
        }
      ]
    };

    // 3. Return JSON directly (Fixes UI crash)
    return new Response(JSON.stringify(architecturePlan), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });
  }
}

// The Worker Gateway
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 2. Forward to Agent
    const id = env.AGENT.idFromName("HeavenArchitect");
    const stub = env.AGENT.get(id);
    
    // We pass the request directly. The class.fetch() above handles the rest.
    return stub.fetch(request);
  },
};