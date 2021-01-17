export const deepCopy = (Obj: any) => {
    return JSON.parse(JSON.stringify(Obj));
};
