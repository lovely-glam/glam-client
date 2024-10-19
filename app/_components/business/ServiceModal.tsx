import React, { useEffect, useState } from "react";

export type ServiceModel = {
    id?: number;
    name: string;
    description: string;
    duration: number;
    basePrice: number;
}

interface ServiceModalProps {
    mode: 'create' | 'edit';
    isOpen: boolean;
    initialData?: ServiceModel;
    onSave: (service: ServiceModel) => void;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ mode, initialData, onSave, isOpen, onClose }) => {
    const [serviceName, setServiceName] = useState<string>(initialData?.name || '');
    const [duration, setDuration] = useState<number>(initialData?.duration || 0);
    const [price, setPrice] = useState<number>(initialData?.basePrice || 0);
    const [description, setDescription] = useState<string>(initialData?.description || '');
    const handleSave = () => {
        if (mode == "edit" && initialData?.id) {
            const data = {
                id: initialData.id,
                name: serviceName,
                basePrice: price,
                description,
                duration
            }
            onSave(data);
        } else {
            const data = {
                id: 1,
                name: serviceName,
                basePrice: price,
                description,
                duration
            }
            onSave(data);
        }
    };
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setServiceName(initialData.name);
            setDuration(initialData.duration);
            setPrice(initialData.basePrice);
        }
    }, [isOpen])

    return (<>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        {mode === 'create' ? 'Create New Service' : 'Edit Service'}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Service Name</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={duration}
                            type="number"
                            onChange={(e) => setDuration(Number(e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={description}
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-[#a23d3d] text-white rounded-lg hover:bg-[#843232] transition-colors duration-200"
                            onClick={handleSave}
                        >
                            {mode === 'create' ? 'Create' : 'Save'}
                        </button>

                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default ServiceModal;