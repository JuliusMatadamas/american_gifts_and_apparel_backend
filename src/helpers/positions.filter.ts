const POSITIONS_FILTER = (data: any | any[]): any[] => {
    // Si la data no es un array, lo convertimos en uno.
    const arrayData = Array.isArray(data) ? data : [data];

    // Clonamos el array
    const REGS = JSON.parse(JSON.stringify(arrayData));

    // Mapeamos los elementos
    return REGS.map(({ _id = null, name = null }) => ({ _id, name }));
}

export { POSITIONS_FILTER };