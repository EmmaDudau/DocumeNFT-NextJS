"use client"
import MetaMask from '@/app/components/MetaMask';

export default function NewNavbar() {
    return (
        <section>
            <div className="fixed top-0 left-0 right-0 z-10 bg-transparent backdrop-blur pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                className="h-8 w-auto pr-2 pb-1"
                                src="https://gateway.pinata.cloud/ipfs/Qmd7tgKp7eUnQsTmatoaskBSpNExFF3PZN89tm6w182QU5"
                                alt="DocumeNFTs"
                            />
                            <a href="/" className="font-medium mr-8 text-white hover:text-gray-900">
                                Home
                            </a>
                            <a href="dashboard" className="font-medium mr-8 text-white hover:text-gray-900">
                                Dashboard
                            </a>
                            <a href="mint" className="font-medium mr-8 text-white hover:text-gray-900">
                                Mint
                            </a>
                        </div>
                        <div>
                            <MetaMask />
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
}
