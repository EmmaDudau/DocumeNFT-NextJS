import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const providerOptions = {};

let web3Modal = null;

export default function MetaMask() {
    const [address, setAddress] = useState('');

    const initWeb3 = () => {
        if (typeof window !== "undefined") {
            web3Modal = new Web3Modal({
                network: "mainnet", // optional
                cacheProvider: true, // optional
                providerOptions, // required
            });
        }
    };

    const connect = async () => {
        const provider = new ethers.providers.Web3Provider(
            await web3Modal.connect()
        );
        const signer = provider.getSigner();
        setAddress(await signer.getAddress());
    };

    useEffect(() => {
        initWeb3();
        if (web3Modal && web3Modal.cachedProvider) {
            connect();
        }
    }, []);

    return (
        <div>
            {address ? (
                <span className="bg-indigo-300 px-4 py-2 rounded-full">{address}</span>
            ) : (
                <button
                    onClick={connect}
                    className="bg-indigo-300 px-6 py-2 rounded-full"
                >
                    Connect
                </button>
            )}
        </div>
    );
}