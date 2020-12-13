//17fc59ad163c4ff0a2295b0980428f40
// Custom Http Module
function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2)    {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();


const newsService = (function(){
  const apiKey = '17fc59ad163c4ff0a2295b0980428f40';
  const apiUrl = 'https://news-api-v2.herokuapp.com';
  return {
    topHeadlines(country = 'ua', category = '', callback){
      http.get(`${apiUrl}/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`, callback);
    },
    everything(query, callback){
      http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, callback)
    }
  };
})();

//Elements
const newsContainer = document.querySelector('.news-container .row');
const form = document.forms['newsControls'];
const countrySelect = form.elements['country'];
const categorySelect = form.elements['category'];
const searchInput = form.elements['search'];


form.addEventListener('submit', (e) => {
  e.preventDefault();
  loadNews();
});

//  init selects
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  loadNews();
});


// Load news function
function loadNews(){
  showLoader();
  const { country, category, searchText } = getFormInput();
  if(!searchText) {
    newsService.topHeadlines(country, category, onGetResponse);
  } else{
    newsService.everything(searchText, onGetResponse);
  }
}

function getFormInput(){
  return {
    country: countrySelect.value,
    category: categorySelect.value,
    searchText: searchInput.value,
  }
}

// function on get response from server
function onGetResponse(error, response) {
  removePreLoader();
  clearContainer(newsContainer);

  if (error) {
    showAlert(error,'error-msg');
    return;
  }
  //show empty message
  if (!response.articles.length){
    newsContainer.insertAdjacentHTML('afterbegin', emptyMessageTemplate());
    return;
  }
  renderNew(response.articles);
}

function renderNew(news) {
  let fragment = '';
  news.forEach(newsItem => {
    const el = newsTemplate(newsItem);
    fragment += el;
  });
  newsContainer.insertAdjacentHTML('afterbegin', fragment);
}

function clearContainer(container) {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
}

// News item template function 
function newsTemplate({urlToImage, title, url, description}){
  return `
    <div class="col s12">
      <div class="card"> 
        <div class="card-image">
          <img src="${urlToImage || 'no_image.png'}"/>
          <span class="card-title"> ${title || ''} </span>
        </div>  
        <div class="card-content">
          <p>${description || ''}</p>
        </div>
        <div class="card-action">
          <a href="${url}">Read more </a>
        </div>
      </div>
    </div>
  `;
}

function emptyMessageTemplate(){
  return `
  <div class="col s12 bold">
    <div class="card"> 
      <div class="card-content">
        <p> К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос :)</p>
      </div>
    </div>
  </div>
`;
}



function showAlert(message, type = 'success') {
  M.toast({html: message, classes:type});
}

function showLoader(){
  document.body.insertAdjacentHTML(
    'afterbegin', 
    `<div class="progress">
      <div class="indeterminate"></div>
    </div>`);
}

function removePreLoader() {
  const loader = document.querySelector('.progress');
  if (loader) {
    loader.remove();
  }
}

