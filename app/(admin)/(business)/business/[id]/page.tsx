"use client"

import ServiceModal, { ServiceModel } from '@/app/_components/business/ServiceModal';
import React, { useState } from 'react';

const BusinessDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('edit');
  const [serviceList, setServiceList] = useState<ServiceModel[]>([]);
  const [currentService, setCurrentService] = useState<ServiceModel>({
    serviceName: '',
    price: 0,
    description: '',
    duration: 1
  });
  const handleServiceClick = (service: ServiceModel) => {
    setCurrentService(service);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <header>
        <div className="container mx-auto py-4 px-6">
          <nav className="flex justify-start space-x-2 text-gray-600">
            <a href="#" className="hover:text-gray-900">Trang chủ</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Cho doanh nghiệp</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">25days - Nail Art</a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8 px-6">
        <ServiceModal mode={modalMode} initialData={currentService} onSave={() => { }} isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
        }} />
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">25days. - Nail Art</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex justify-center">
            <img
              src="/path-to-logo.png"
              alt="25days Nail Logo"
              className="w-64"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <img
              src="/path-to-image1.png"
              alt="Nail Art 1"
              className="rounded-lg shadow-md"
            />
            <img
              src="/path-to-image2.png"
              alt="Nail Art 2"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Dịch vụ</h2>
          <div className="space-y-4">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="bg-white min-h-[10em] p-4 rounded-2xl shadow-md cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex justify-between">
                  <span>{service.serviceName}</span>
                  <span>{service.duration}</span>
                </div>
                <div className="text-right font-semibold text-pink-500">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
};

export default BusinessDashboard;
