class Api {
  fetchData() {
    const promise = axios({
      url: "https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone",
      method: "GET",
    });

    return promise;
  }
}

export default new Api();
