class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getApiResponse() {
    return res => {
      if (res.ok) {
        return res.json();
      }
    
      return Promise.reject(res.status);
    }
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/users/me`), {
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
    })
      .then(this._getApiResponse())
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/cards`), {
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
    })
    
      .then(this._getApiResponse())
  }

  editUserInfo({ name, about }) {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/users/me`), {
      method: 'PATCH',
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({ name, about })
    })

      .then(this._getApiResponse())
  }

  postNewCard({ name, link }) {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/cards`), {
      method: 'POST',
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({ name, link })
    })
    
      .then(this._getApiResponse())
  }

  removeCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/cards/${cardId}`), {
      method: 'DELETE',
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
    })
      .then(this._getApiResponse())
  }

  changeLikeState(cardId, isLiked) {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/cards/${cardId}/likes`), {
      method: isLiked ? "DELETE" : "PUT",
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
    })

      .then(this._getApiResponse())
  }

  editProfilePicture({ avatar }) {
    const token = localStorage.getItem('token');
    return fetch((`${this._baseUrl}/users/me/avatar`), {
      method: 'PATCH',
      headers: {...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({ avatar })
    })
      
      .then(this._getApiResponse())
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});