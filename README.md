# 🏗️ Heaven: The AI Architect for IP Assets

> **"Don't just generate code. Own the blueprint."**

![Heaven Banner]([![landingui-(1).png](https://i.postimg.cc/SxcgLb8z/landingui-(1).png)](https://postimg.cc/NKf8YVdg) 
*(Replace with a screenshot of your app)*

**Heaven** is a "Headless" Agentic Infrastructure that turns English prompts into deployed dApps. Unlike standard coding assistants, Heaven treats every generated architecture as a **Real World Asset**. It autonomously creates, validates, and **registers the software blueprint as Intellectual Property (IP)** on Story Protocol before a single line of code is deployed.

---

### 🔗 Quick Links
- **🎥 Demo Video:** [INSERT_YOUTUBE_LINK_HERE]
- **🌐 Live App:** [INSERT_VERCEL_LINK_HERE]
- **📜 Verified IP Asset (Story Explorer):** [INSERT_LINK_TO_A_REAL_TX_ON_STORY_EXPLORER]

---

## 🌍 The "Surreal World Asset" Problem
We identified a critical gap in the Generative AI boom:
1.  **The "Idea Theft" Paradox:** AI makes it easy to generate brilliant software architectures, but there is no mechanism to claim ownership of these outputs.
2.  **The Unbanked Agent:** AI agents can write code but cannot transact, pay for gas, or protect their work.
3.  **Software is an RWA:** Intellectual Property (software architecture) is the most valuable Real World Asset in the digital economy, yet it remains untracked and unprotected on-chain.

## ⚡ The Solution: Heaven
Heaven is the first **IP-First Construction Company**. It orchestrates the entire supply chain of software creation while ensuring the creator retains ownership.

1.  **🗣️ You Prompt:** *"Build a Music Streaming DAO."*
2.  **🧠 Heaven Architects:** The NullShot agent breaks this down into a technical graph (Smart Contracts + Frontend).
3.  **📜 Heaven Registers:** Before coding, the agent interacts with **Story Protocol** to mint the "Architecture Plan" as a Programmable IP Asset. You now own the blueprint on-chain.
4.  **🛠️ Heaven Builds:** The agent uses **Thirdweb** to deploy the contracts autonomously.

---

## 🛠️ How It's Made (Technical Architecture)

We solved the "Monolith Problem" by decoupling Intelligence from Execution. Our architecture consists of three distinct layers connected by a custom HTTP bridge.

### 1. The Brain: NullShot Agent (Cloudflare Workers)
* **Engine:** Custom TypeScript agent built on the **NullShot** framework.
* **Innovation:** We enforce a "Manager Pattern." The agent cannot hallucinate code directly; it must use tools.
* **Routing:** We implemented a custom `fetch` override to bypass standard AI SDK routing, allowing direct, latency-free JSON communication with our frontend.

### 2. The Registry: Story Protocol Integration
* **SDK:** `@story-protocol/core-sdk`
* **Workflow:**
    * The Agent generates a JSON `plan.json` representing the software architecture.
    * We use the **SPG (Stateful Programmable Gateway)** to mint an NFT and register it as an IP Asset in a single atomic transaction on the Story Aeneid Testnet.
    * **Result:** The user gets an Explorer Link proving they own the copyright to the generated system.

### 3. The Hands: Thirdweb & Frontend
* **UI:** React + Vite + Tailwind CSS.
* **Wallet:** Integrated **Thirdweb SDK v5** for authentication and Account Abstraction.
* **Payment Gate:** To simulate a real-world "Contractor" relationship, we implemented a transaction gate. The user must approve a **0.0001 ETH** authorization fee before the agent begins work.

---

## 🧪 How to Run Locally

This is a monorepo containing both the Agent (Backend) and the UI (Frontend).

### Prerequisites
* Node.js v18+
* pnpm
* A wallet with **Story Aeneid Testnet** ETH.

### Step 1: Wake the Brain (Agent)
```bash
cd heaven-agent/examples/heaven-architect
pnpm install
# Starts the agent on [http://127.0.0.1:8787](http://127.0.0.1:8787)
npx wrangler dev --local
