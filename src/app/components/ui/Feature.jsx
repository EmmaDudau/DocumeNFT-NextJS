import {DocumentIcon, KeyIcon, LockClosedIcon} from "@heroicons/react/24/solid";

export default function Feature() {


    const features = [
        {
            name: 'ERC-721 Standard',
            description:
                'Each ERC-721 token is distinct and cannot be replicated or divided into smaller units.',
            icon: DocumentIcon,
        },
        {
            name: 'Privacy ensured',
            description:
                'Pinata IPFS .',
            icon: KeyIcon,
        },
        {
            name: 'Secure data storage',
            description:
                'The contracts store a hash of the metadata, ensuring that the metadata remains the same.',
            icon: LockClosedIcon,
        },
    ]

    return (
        <div className="relative bg-grey-50 py-16 sm:py-24 lg:py-40">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                          <span
                              className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                          </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-600 tracking-tight hover:text-black">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500 hover:text-black">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}