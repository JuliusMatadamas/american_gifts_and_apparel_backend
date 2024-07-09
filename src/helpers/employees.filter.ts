const EMPLOYEES_FILTER = (data: any | any[]): any[] => {
    // Si la data no es un array, lo convertimos en uno.
    const arrayData = Array.isArray(data) ? data : [data];

    // Clonamos el array
    const REGS = JSON.parse(JSON.stringify(arrayData));

    // Mapeamos los elementos
    return REGS.map(({ _id = null, firstName = null, lastName = null, birthDate = null, genre = null, email = null, mobile = null, address = null, starting = null, ending = null, idPosition = null }) => ({ _id, firstName, lastName, birthDate, genre, email, mobile, address, starting, ending, idPosition }));
}

export { EMPLOYEES_FILTER };