'use client';
import ShopCard from '@/app/_components/shop/ShopCard';
import { getShops } from '@/app/_services/shopService';
import classNames from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const pages = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];

const Shops = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('p');

  const [currentPage, setCurrentPage] = useState<number>(
    Number.parseInt(page ?? '1')
  );
  const [shops, setShops] = useState<any>(null);

  useEffect(() => {
    fetchShops(currentPage);
  }, [currentPage]);

  const fetchShops = async (page: number) => {
    try {
      const res = await getShops(page - 1);

      if (res.status === 200) {
        setShops(res.data.content.content);
        console.log(shops);
      }
    } catch (error) {}
  };

  return (
    shops && (
      <div className='flex flex-col p-10 px-48 space-y-4'>
        {shops.map((shop: any) => {
          return (
            <ShopCard
              key={shop.id}
              id={shop.id}
              name={shop.name}
              rating={shop.vote}
              address={shop.address}
              services={shop.services}
              image={shop.avatarUrl}
            />
          );
        })}
        <div className='w-full flex justify-center'>
          <div className='join'>
            {pages.map((pg: any) => {
              return (
                <Link
                  key={pg.num}
                  href={`/shops?p=${pg.num}`}
                  className={classNames({
                    'join-item': true,
                    btn: true,
                    'btn-active': Number.parseInt(page ?? '1') === pg.num,
                  })}
                  onClick={() => setCurrentPage(pg.num)}
                >
                  {pg.num}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Shops;
