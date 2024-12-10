"use client";

import { deleteProduct } from "@/actions";

interface DeleteButtonProps {
  productId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productId }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      window.location.reload(); // Recargar la página después de eliminar
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Ocurrió un error al intentar eliminar el producto.");
    }
  };

  return (
    <button
      className="text-red-500 hover:text-red-700"
      onClick={handleDelete}
    >
      x Eliminar
    </button>
  );
};

export default DeleteButton;
