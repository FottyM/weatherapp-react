export const loadState = () =>{
    try {
        const serializedSate = localStorage.getItem('state');
        if(serializedSate === null ) return undefined;
        return JSON.parse(serializedSate);
    }
    catch(e) {
        console.log(e);
        return undefined;
    }

}

export const saveState = (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch (e){
        console.log(e)
    }
}