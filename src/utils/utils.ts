import request from '@/utils/request';

export const deepCopy = (Obj: any) => {
    return JSON.parse(JSON.stringify(Obj));
};

export const getJSON = (url: string) => {
    return new Promise((resolve, reject) => {
        request.get(url).then((response: Response) => {
            resolve(response);
        });
    });
};
