

export const generatePagination = ( currentPage: number, totalPages: number) => {
    // Si el nro total de pags es 7 o menos
    // vamos a mostrar todas las páginas sin puntos suspensivos
    if( totalPages < 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // Si la pág actual está entre las primeras 3 páginas
    // mostrar las primeras tres páginas, puntos susp, y las últimas dos
    if( currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // Si la pag actual está entre las últimas 3 páginas
    // mostrar las primeras dos páginas, puntos susp, y las últimas 3
    if( currentPage > totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // Si la pág actual está en otro lugar medio
    // mostrar la primera pág, puntos susp, la pág actual y vecinos
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}