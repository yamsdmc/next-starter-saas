export const fetcher = (input: RequestInfo | URL, init?: RequestInit): Promise<any> => {
    return fetch(input, init).then((res) => res.json());
};