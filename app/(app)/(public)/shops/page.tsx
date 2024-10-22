'use client';
import ShopCard from '@/app/_components/shop/ShopCard';
import { IPaginationResponse } from '@/app/_services/baseService';
import { getShops } from '@/app/_services/shopService';
import classNames from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export type ShopCardResponse = {
  id: number;
  name: string;
  avatarUrl: string;
  thumbnails: string[];
  address: string;
  phone: string;
  vote: number;
  nailServices: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    duration: number;
  }[];
}

const Shops = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<ShopCardResponse>>()
  const [query, setQuery] = useState<string | null>(q);
  const [currentPage, setCurrentPage] = useState<number>(
    0
  );
  const [shops, setShops] = useState<ShopCardResponse[]>([]);


  useEffect(() => {
    const fetch = async () => {
      setQuery(q);
      await fetchShops(currentPage);
    }
    fetch();
  }, [currentPage]);

  const fetchShops = async (page: number) => {
    try {
      const res = await getShops(page, 5, query);

      if (res.status === 200) {
        setShops(res.data.content.content);
        setPaginationResponse(res.data.content);
      }
    } catch (error) { }
  };
  return (
    shops && (
      <div className='flex flex-col p-10 px-48 space-y-4'>
        {shops.map((shop: ShopCardResponse) => {
          return (
            <ShopCard
              key={shop.id}
              id={shop.id}
              name={shop.name}
              rating={shop.vote}
              address={shop.address}
              services={shop.nailServices}
              image={shop.avatarUrl}
            />
          );
        })}
        <div className='mt-8 flex justify-center space-x-4'>
          <button
            className={`btn ${paginationResponse?.firstPage ? 'btn-disabled' : ''}`}
            onClick={() => { setCurrentPage(currentPage - 1) }}
            disabled={paginationResponse?.firstPage}
          >
            Previous
          </button>
          {Array.from({ length: Number(paginationResponse?.totalPage) }, (_, index) => (
            <button
              key={index}
              className={`btn ${paginationResponse?.page === index + 1 ? 'btn-active' : ''}`}
              onClick={() => { }}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`btn ${paginationResponse?.lastPage ? 'btn-disabled' : ''}`}
            onClick={() => { setCurrentPage(currentPage + 1) }}
            disabled={paginationResponse?.lastPage}
          >
            Next
          </button>
        </div>
      </div>
    )
  );
};

export default Shops;
