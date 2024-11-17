"use client"

import React, { useEffect, useState } from "react";
import chains from '../../data/chains.json';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
// import { ethers } from "ethers";

// interface BridgeProps {
//     provider: ethers.providers.Web3Provider;
// }

export default function Bridge(){
    const [token, setToken] = useState<"USDC" | "WETH">("USDC");
    const [sourceChain, setSourceChain] = useState<keyof typeof chains.chains>("Optimism");
    const [destinationChain, setDestinationChain] = useState<keyof typeof chains.chains>("Base");
    const [amount, setAmount] = useState<string>("");
    const [walletAddress, setWalletAddress] = useState('');
    const {primaryWallet, user} = useDynamicContext();
    const chainInfo = chains.chains;

    useEffect(() => {
        setWalletAddress(primaryWallet !== null ? primaryWallet.address : '');
    }, [primaryWallet]);

    // Approve tokens for bridge contract
    const approveTokens = async (amount: string) => {
        // const signer = provider.getSigner();
        // const tokenAddress = chainInfo[sourceChain][token.toLowerCase() as "usdc" | "weth"];
        // const bridgeAddress = chainInfo[sourceChain].ccipRouter;
        //
        // const erc20ABI = [
        //     "function approve(address spender, uint256 amount) public returns (bool)"
        // ];
        //
        // const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
        // const tx = await tokenContract.approve(bridgeAddress, ethers.utils.parseUnits(amount, 18));
        // await tx.wait();
        // console.log(`${token} approved for bridge contract.`);
    };

    // Bridge function
    const bridgeTokens = async () => {
        // const signer = provider.getSigner();
        // const bridgeAddress = chainInfo[sourceChain].ccipRouter;
        // const destinationSelector = chainInfo[destinationChain].chainSelector;
        //
        // const bridgeABI = [
        //     "function bridge(uint256 chainSelector, address token, uint256 amount) external"
        // ];
        //
        // const bridgeContract = new ethers.Contract(bridgeAddress, bridgeABI, signer);
        //
        // const tokenAddress = chainInfo[sourceChain][token.toLowerCase() as "usdc" | "weth"];
        // const amountInWei = ethers.utils.parseUnits(amount, 18);
        //
        // const tx = await bridgeContract.bridge(
        //     destinationSelector,
        //     tokenAddress,
        //     amountInWei
        // );
        // await tx.wait();
        // console.log("Tokens bridged successfully.");
    };

    // Handle submission
    const handleSubmit = async () => {
        try {
            await approveTokens(amount);
            await bridgeTokens();
        } catch (error) {
            console.error("Error during bridging:", error);
        }
    };
    return (
        <div className="mt-12 max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bridge Tokens</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Source Chain:</label>
                <select
                    value={sourceChain}
                    onChange={(e) => setSourceChain(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {Object.keys(chainInfo).map((chain) => (
                        <option key={chain} value={chain}>
                            {chain}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Destination Chain:</label>
                <select
                    value={destinationChain}
                    onChange={(e) => setDestinationChain(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {Object.keys(chainInfo).map((chain) => (
                        <option key={chain} value={chain}>
                            {chain}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Token:</label>
                <select
                    value={token}
                    onChange={(e) => setToken(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="USDC">USDC</option>
                    <option value="WETH">WETH</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">Amount:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-black focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={!amount || !walletAddress || !primaryWallet}
            >
                Bridge
            </button>
        </div>

    );
}