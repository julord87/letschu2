// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedUsers } from '@/actions';
import Title from '@/components/ui/title/Title';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';
import { Pagination } from '@/components';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={3} />
      </div>
    </>
  );
}