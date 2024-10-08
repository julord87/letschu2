export const generatePagination = (currentPage: number, totalPages: number) => {
    // Si el número total de páginas es menor a 7, mostrar todas las páginas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // Si la página actual está en las primeras 3
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
  
    // Si la página actual está en las últimas 3
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
  
    // Si la página actual está en el medio
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };
  