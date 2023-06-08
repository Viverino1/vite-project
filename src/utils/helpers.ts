function getValue(id: string, fallback: string){
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    const value = inputElement?.value;
    return value? value : fallback;
}

function contsub(cont: number, sub: number){
    var message = cont + "" + sub;

    if(cont < 0){
        if(cont == -1){
            message = "Conclusion";
        }else if(cont == -2){
            message = "Intro";
        }else if(cont == -3){
            message = "No Contention";
        }
    }else{
        message = "Contention " + (cont + 1);
        if(sub >= 0){
            message += " | Subpoint " + (sub + 1);
        }
    }

    return message;
}

export{
    getValue,
    contsub,
}