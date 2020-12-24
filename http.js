const http = customHttp();

function customHttp () {
    return {
        async get(url) {
            try{
                response = await fetch(url).then(res => res.json());
                return response;
            }
            catch(error) {
                return Promise.reject(error);
            }
        },
        async post(url, headers = {}, body = {}) {
            try{
                const init = {
                    method:'POST',
                    headers: headers,
                    body: JSON.stringify(body),
                }
                const response = await fetch(url, init).then(res => res.json());
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
        },
        async put(url, headers = {}, body = {}) {
            try{
                const init = {
                    method:'PUT',
                    headers: headers,
                    body: JSON.stringify(body),
                }
                const response = await fetch(url, init).then(res => res.json());
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
        },
        async delete(url) {
            try{
                const init = {
                    method:'DELETE',
                }
                response = await fetch(url, init).then(res => res.json());
                return response;
            }
            catch(error) {
                return Promise.reject(error);
            }
        },
    }
};

const body = {
    id: 652,
    name: 'Olga',
    email: 'olga@gmail.com',
    username: 'olala',
    phone: '367892393',
    website: 'www.olala.com.ua',
};

const post = {
    id: 1,
    body: 'Djadgfjpi ugim opfwdsmn djsofm sdkhfnvwek dcugbdr dsvbh ehfcv, gdiuf kwdv ewujgfcbbas. Ehiefgo wfeogu hggifwe, hgfewuigfevh hufhjfwa. Fifwehef yuopk - mnvfdr pojkhbvfdrty.',
    title: 'Ykdnej skskde odksb ckfk',
    userId: 1,

}




Promise.all([
    http.get('https://jsonplaceholder.typicode.com/posts'),
    http.post('https://jsonplaceholder.typicode.com/users', {'Content-type': 'application/json; charset=UTF-8'}, body),
    http.put('https://jsonplaceholder.typicode.com/posts/1', {'Content-type': 'application/json; charset=UTF-8'}, post),
    http.delete('https://jsonplaceholder.typicode.com/posts/1'),
])
    .then(result => console.log(result))
    .catch(error => console.log(error));

