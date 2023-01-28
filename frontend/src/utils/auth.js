class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
    _getResponse() {
      return res => {
        if (res.ok) {
          return res.json();
        }
      
        return Promise.reject(res.status);
      }
    }

    register({ password, email }) {
      return fetch((`${this._baseUrl}/signup`), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ password, email })
      })
        .then(this._getResponse())
    }

    authorize({ password, email }) {
      return fetch((`${this._baseUrl}/signin`), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ password, email })
      })
        .then(this._getResponse())
        
    }

    checkToken(token) {
      return fetch((`${this._baseUrl}/users/me`), {
        method: 'GET',
        headers: {...this._headers,
          authorization: `Bearer ${token}`},
      })
        .then(this._getResponse());
    }
}

export const auth = new Auth({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})