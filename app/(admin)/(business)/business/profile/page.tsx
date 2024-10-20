"use client"
import ServiceModal, { ServiceModel } from '@/app/_components/business/ServiceModal';
import React, { useEffect, useState } from 'react';
import { getProfiles, updateProfileService, createProfileService } from '@/app/_services/businessService';
import { toast, ToastContainer } from 'react-toastify';

export type NailProfileDetailResponse = {
  id: number;
  name: string;
  avatarUrl: string;
  thumbnails: string[];
  address: string;
  phone: string;
  nailServices: ServiceModel[]
}

const BusinessProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'none'>('edit');
  const [serviceList, setServiceList] = useState<ServiceModel[]>([]);
  const [nailProfile, setNailProfile] = useState<NailProfileDetailResponse>();
  const [currentService, setCurrentService] = useState<ServiceModel>();
  const handleServiceClick = () => {
    setIsModalOpen(true);
  };
  const fetchProfile = async (): Promise<NailProfileDetailResponse | undefined> => {
    try {
      const result = await getProfiles();
      if (result.status === 200) {
        return result.data.content;
      }
    } catch (err) {
      console.log(err);
    }
  }
  const updateService = async (service: ServiceModel) => {
    const updateToast = toast.loading(
      'Updating', {
      toastId: 'profileUpdateToast',
      autoClose: false,
      closeOnClick: false,
      hideProgressBar: true,
      draggable: false,
      position: 'bottom-right',
      pauseOnHover: false,
      progress: undefined,
      theme: 'light',
    }
    );
    try {
      const updateResult = await updateProfileService(service);
      if (updateResult.status === 200 && updateResult.data.success) {
        toast.update(updateToast, {
          render: 'Update Success',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
          position: 'bottom-right',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        setIsModalOpen(false);
        setModalMode('none');
      } else {
        toast.update(updateToast, {
          render: 'Update Failed',
          type: 'error',
          isLoading: false,
          autoClose: 2500,
          position: 'bottom-right',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.update(updateToast, {
        render: 'Error happen',
        type: 'error',
        isLoading: false,
        autoClose: 2500,
        position: 'bottom-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  const createService = async (service: ServiceModel) => {
    const updateToast = toast.loading(
      'Creating', {
      toastId: 'profileUpdateToast',
      autoClose: false,
      closeOnClick: false,
      hideProgressBar: true,
      draggable: false,
      position: 'bottom-right',
      pauseOnHover: false,
      progress: undefined,
      theme: 'light',
    }
    );
    try {
      const updateResult = await createProfileService(service);
      if (updateResult.status === 200 && updateResult.data.success) {
        toast.update(updateToast, {
          render: 'Create Success',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
          position: 'bottom-right',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        setIsModalOpen(false);
        setModalMode('none');
      } else {
        toast.update(updateToast, {
          render: 'Create Failed',
          type: 'error',
          isLoading: false,
          autoClose: 2500,
          position: 'bottom-right',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.update(updateToast, {
        render: 'Error happen',
        type: 'error',
        isLoading: false,
        autoClose: 2500,
        position: 'bottom-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  }
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchProfile();
      console.log(result);
      if (result) {
        setNailProfile(result);
        setServiceList(result.nailServices);
      }
    }
    fetch();
  }, [isModalOpen]);
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header>
        <div className="container mx-auto py-4 px-6">
          <nav className="flex justify-start space-x-4 text-gray-700">
            <a href="#" className="hover:text-gray-900 transition duration-200">Trang chủ</a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-gray-900 transition duration-200">Cho doanh nghiệp</a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-gray-900 transition duration-200">{nailProfile?.name}</a>
          </nav>
        </div>
      </header>

      <ToastContainer />

      <main className="container mx-auto py-8 px-6">
        <ServiceModal
          mode={modalMode}
          initialData={currentService}
          onSave={async (service) => {
            if (service?.id && modalMode === 'edit') {
              await updateService(service);
            } else {
              await createService(service);
            }
          }}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setModalMode('none');
          }}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">{nailProfile?.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex justify-center">
            <img
              src={nailProfile?.avatarUrl}
              alt="25days Nail Logo"
              className="w-72 h-72 object-cover rounded-lg shadow-xl border-4 border-pink-400 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-pink-600"
            />
          </div>

          <div className="flex flex-col space-y-4">
            {nailProfile?.thumbnails.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105">
                <img
                  src={image}
                  alt={`Nail Art ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Dịch vụ</h2>
            <button
              onClick={() => {
                setModalMode('create');
                setIsModalOpen(true);
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
              Thêm dịch vụ
            </button>
          </div>
          <div className="space-y-6">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-r from-[#b44b4b] via-[#a23d3d] to-[#843232] p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setCurrentService(service);
                  setModalMode('edit');
                  handleServiceClick();
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-100">{service.name}</span>
                  <div>
                    <span className="text-gray-300 text-sm">Duration: </span>
                    <span className="text-sm text-gray-200">{service.duration}</span>
                  </div>
                </div>
                <div className="text-right mb-2">
                  <span className="text-gray-300 text-sm">Base Price:</span>
                  <div className="text-2xl font-semibold text-[#ffd1d1]">{service.basePrice}</div>
                </div>
                <div>
                  <span className="text-gray-300 text-sm">Description:</span>
                  <div className="mt-2 text-gray-100 italic">{service.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>

  )
};

export default BusinessProfile;
