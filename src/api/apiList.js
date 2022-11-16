const apiLink = 'https://staging-backend.esyms-api.com/esyms/website/product/front-condition';

export async function apiGetListProduct(data) {

    let response = await fetch(apiLink + `?name=${data.name}` + `&page=${data.page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })

    let result = await response.json();

    if (response.status !== 200){
        throw result;
    }

    return result;
    
}