// https://tailwindcomponents.com/component/hoverable-table
;
import { getAllPaginatedProductsWithImages } from '@/actions';
import { Pagination } from '@/components';
import Title from '@/components/ui/title/Title';
import { currencyFormat } from '@/helpers/currencyFormat';
import Image from 'next/image';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page?: number;
  }
}

export default async function OrdersPage({ searchParams }: Props) {

  const page = searchParams.page ? Number(searchParams.page) : 6;

  const { products, currentPage, totalPages } = await getAllPaginatedProductsWithImages({page});
  
  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className='flex justify-end mb-5'>
        <Link href={'/admin/product/new'} className='btn-primary'>
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Colores
              </th>
            </tr>
          </thead>
          <tbody>


          {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`} target='_blank' rel='noopener noreferrer'>
                    <Image
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className='hover:underline' target='_blank' rel='noopener noreferrer'>
                    {product.title}
                  </Link>
                </td>

                <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
                  { currencyFormat(product.price) }
                </td>

                <td className="text-sm font-light text-gray-900 px-6 py-4 whitespace-normal">
  {product.colors.join(', ')}
</td>

              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}