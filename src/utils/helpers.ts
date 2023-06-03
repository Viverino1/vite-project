function getValue(id: string, fallback: string){
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    const value = inputElement?.value;
    return value? value : fallback;
}

export{
    getValue,
}