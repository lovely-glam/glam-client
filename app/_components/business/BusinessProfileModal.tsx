// components/ProfileModal.tsx
import { uploadFile } from '@/app/_services/workerService';
import { useEffect, useRef, useState } from 'react';

type Profile = {
    name: string;
    avatarUrl: string;
    thumbnails: string[];
    address: string;
};

type ProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Profile) => void;
    initialData: Profile;
};

const BusinessProfileUpdateModal: React.FC<ProfileModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialData,
}) => {
    const [name, setName] = useState(initialData.name);
    const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
    const [thumbnails, setThumbnails] = useState<string[]>(initialData.thumbnails);
    const [address, setAddress] = useState(initialData.address);
    const [isUploading, setIsUploading] = useState(false);
    const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        type: 'avatar' | 'thumbnail',
        index?: number
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await uploadFile(formData);
                if (response.status === 200) {
                    if (type === 'avatar') {
                        setAvatarUrl(response.data.content);
                    } else if (type === 'thumbnail' && index !== undefined) {
                        const updatedThumbnails = [...thumbnails];
                        updatedThumbnails[index] = response.data.content;
                        setThumbnails(updatedThumbnails);
                    } else if (type === 'thumbnail') {
                        setThumbnails((prevThumbnails) => [
                            ...prevThumbnails,
                            response.data.content,
                        ]);
                    }
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };
    useEffect(() => {
        setName(initialData.name);
        setAddress(initialData.address);
        setAvatarUrl(initialData.avatarUrl);
        setThumbnails(initialData.thumbnails);
    }, [initialData])
    const handleAddThumbnailClick = () => {
        if (thumbnailInputRef.current) {
            thumbnailInputRef.current.click();
        }
    };
    return (
        <>
            {isOpen ? (<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">Cập nhật hồ sơ doanh nghiệp</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Avatar</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <img
                                    src={avatarUrl || 'https://via.placeholder.com/150'}
                                    alt="Avatar Preview"
                                    className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md object-cover"
                                />
                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                        <span className="text-white text-sm">Uploading...</span>
                                    </div>
                                )}
                            </div>
                            <label className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow cursor-pointer hover:bg-pink-600 transition">
                                Upload Avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => await handleFileUpload(e, 'avatar')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-pink-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Thumbnails</label>
                        {thumbnails.length > 0 ? (
                            thumbnails.map((thumbnail, index) => (
                                <div key={index} className="flex items-center mb-4 space-x-4">
                                    <div className="relative">
                                        <img
                                            src={thumbnail || 'https://via.placeholder.com/100'}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-20 h-20 rounded-lg border shadow-md object-cover"
                                        />
                                        <label
                                            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full cursor-pointer"
                                            onClick={() => {
                                                const updatedThumbnails = [...thumbnails];
                                                updatedThumbnails.splice(index, 1);
                                                setThumbnails(updatedThumbnails);
                                            }}
                                        >
                                            X
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No thumbnails available</p>
                        )}

                        <button
                            onClick={handleAddThumbnailClick}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                        >
                            + Add Thumbnail
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={thumbnailInputRef}
                            onChange={async (e) => await handleFileUpload(e, 'thumbnail')}
                            className="hidden"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave({ name, avatarUrl, address, thumbnails })}
                            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>) : null}
        </>
    );
}

export default BusinessProfileUpdateModal;
