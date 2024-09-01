import { notFound } from "next/navigation";


interface Props {
  params: {
    id: string
  }
}

export default function({ params }: Props) {

const { id } = params;

if( id === 'extras') {
  notFound();
}

  return (
    <div>
      <h1>{id} Page</h1>
    </div>
  );
}