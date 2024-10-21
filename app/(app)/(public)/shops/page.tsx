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
    const fetch = async() => {
      setQuery(q);
      await fetchShops(currentPage);
    }
    fetch();
    console.log(query);
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
        <div className='w-full flex justify-center'>
          <div className='join'>
            {paginationResponse?.isFirstPage && (
              <button
                className='join-item btn'
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            )}
            {(() => {
              const buttons = [];
              for (let i = currentPage; i <= Number.apply(paginationResponse?.totalPage); i++) {
                buttons.push(
                  <button
                    key={i}
                    className={classNames({
                      'join-item': true,
                      btn: true,
                      'btn-active': currentPage === i,
                    })}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </button>
                );
              }
              return buttons;
            })()}
            {paginationResponse?.isLastPage && (
              <button
                className='join-item btn'
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Shops;
