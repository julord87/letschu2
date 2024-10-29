import Title from "@/components/ui/title/Title";
import React from "react";
import { auth } from "../../../../auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
    //   redirect('/auth/login?/returTo=/perfil');

      redirect('/');
    }

  return (
    <div>
      <Title title="Perfil" />

      <h3 className="text-3xl mb-10">{session.user.name}</h3>
    </div>
  );
};
