"use client"
import ServiceModal, { ServiceModel } from '@/app/_components/business/ServiceModal';
import React, { useEffect, useState } from 'react';
import { getProfiles, updateProfileService } from '@/app/_services/businessService';
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
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('edit');
  const [serviceList, setServiceList] = useState<ServiceModel[]>([]);
  const [nailProfile, setNailProfile] = useState<NailProfileDetailResponse>();
  const [currentService, setCurrentService] = useState<ServiceModel>({
    name: '',
    basePrice: 0,
    description: '',
    duration: 1
  });
  const handleServiceClick = (service: ServiceModel) => {
    setCurrentService(service);
    setModalMode('edit');
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
      console.log(updateResult);
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
      console.error("Fuck 3");
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

  const createService = (service: ServiceModel) => {

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
  }, []);
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header>
        <div className="container mx-auto py-4 px-6">
          <nav className="flex justify-start space-x-4 text-gray-700">
            <a href="#" className="hover:text-gray-900 transition">Trang chủ</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900 transition">Cho doanh nghiệp</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900 transition">{nailProfile?.name}</a>
          </nav>
        </div>
      </header>

      <ToastContainer />

      <main className="container mx-auto py-8 px-6">
        <ServiceModal
          mode={modalMode}
          initialData={currentService}
          onSave={async (service) => {
            if (service?.id) {
              await updateService(service);
            } else {
            }
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{nailProfile?.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex justify-center">
            <img
              src={nailProfile?.avatarUrl}
              alt="25days Nail Logo"
              className="w-72 shadow-lg border-4 border-pink-300"
            />
          </div>

          <div className="flex flex-col space-y-4">
            {nailProfile?.thumbnails.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Nail Art ${index + 1}`}
                className="rounded-lg shadow-md transition-transform hover:scale-105"
              />
            ))}
            <img
              src="/path-to-image2.png"
              alt="Nail Art 2"
              className="rounded-lg shadow-md transition-transform hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dịch vụ</h2>
          <div className="space-y-6">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-r from-[#b44b4b] via-[#a23d3d] to-[#843232] p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleServiceClick(service)}
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
