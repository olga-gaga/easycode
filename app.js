function customHttp() {
    return {
        get(url, callback) {
            try{
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', () => {
                    if(Math.floor(xhr.status/100) !== 2) {
                        callback(`Error code status: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    console.log(response);
                    callback(null, response);
                });

                xhr.addEventListener('error', () => {
                    callback(`Error code status: ${xhr.status}`, xhr);
                });
                xhr.send();
            } catch (error) {
                callback(error);
            }
        },
        post(url, body, headers, callback){
            try{
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener('load', () => {
                    if(Math.floor(xhr.status/100) !== 2) {
                        callback(`Error code status: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    callback(null, response);
                    console.log(response);
                });

                xhr.addEventListener('error', () => {
                    callback(`Error code status: ${xhr.status}`, xhr);
                });

                if (headers) {
                    Object.entries(headers).forEach( ([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    })
                }
                xhr.send(JSON.stringify(body));
            } catch (error) {
                callback(error);
            }
        }
    };
}

const http = customHttp();

// Elements
const container = document.querySelector('.container');
const form = document.forms['newUser'];

// Get users list
http.get('https://jsonplaceholder.typicode.com/users', onGetResponse);

// Events
container.addEventListener('click', onUserCardHandler);
form.addEventListener('submit', onFormSubmit);

function postNewUser(){
    const body = createRequestBody(form);
    http.post('https://jsonplaceholder.typicode.com/users', body, {'Content-type': 'application/json; charset=UTF-8'}, renderUser);
}

function createRequestBody(form){
    return {
        id: 1,
        name: form.elements['inputName'].value,
        email: form.elements['inputEmail'].value,
        username: form.elements['inputUsername'].value,
        phone: form.elements['inputPhone'].value,
        website: form.elements['inputWebsite'].value,
    };
}

function onFormSubmit(e){
    e.preventDefault();
    postNewUser();
    form.reset();
}

function onGetResponse(error, response) {
    if (error) {
        console.log(error, response);
        return;
    }
    if (response.length) {
        sessionStorage.setItem('users', JSON.stringify(response));
        renderUsers(response);
        console.log(response);
    }  
}

function renderUser(error, user) {
    container.insertAdjacentHTML('afterbegin', createUserCard(user));
    createUserField(user);
}

function createUserField(user) {
   const users = JSON.parse(sessionStorage.getItem('users'));
   users[users.length] = user;
   sessionStorage.setItem('users', JSON.stringify(users));
}

function renderUsers(usersList){
    let fragment = '';
    usersList.forEach(user => fragment += createUserCard(user));
    container.insertAdjacentHTML('afterbegin', fragment);
}

function createUserCard({id, name}){
    return `
        <div class="card mx-auto my-3 bg-light"> 
            <div class="card-body">
                <h5 class="card-title" data-id="${id}"> ${name} </h5>
            </div>
        </div>`;
}

function onUserCardHandler({target}){
    if (target.classList.contains('card-title')){
        const parent = target.closest('.card-body');
        const id = parseInt(target.dataset.id);
        checkUserInfo(parent,id);
    }
}

function checkUserInfo(parent, id) {
    if(parent.querySelector('.info-part')) {
        removeElement(parent, '.info-part');
        return;
    }
    renderUserInfo(parent, id);
}

function getUser(id) {
    return JSON.parse(sessionStorage.getItem('users'))[id - 1];
} 

function renderUserInfo(parentNode, userId) {
    const user = getUser(userId);
    if(!user) return;
    const infoPart = createInformationPart(user);
    parentNode.insertAdjacentHTML('beforeend', infoPart); 
}

function createInformationPart({username, email, phone, website, company: {name:companyName} = {}} = {}){
    return `
        <div class='info-part'>
            ${createInfoItemTemplate('Username', username)}
            ${createInfoItemTemplate('Email', email)}
            ${createInfoItemTemplate('Phone', phone)}
            ${createInfoItemTemplate('Company', companyName)}
            ${createInfoItemTemplate('Website', website)}
        </div>
    `;
}

function createInfoItemTemplate(name, info){
 if (info) {
     return `<p class="card-text"><span class='info-item'>${name}:</span> ${info}</p>`
 }
 return '';
}

function removeElement(parent, nodeClass) {
    const node = parent.querySelector(nodeClass);
    node.remove();
}