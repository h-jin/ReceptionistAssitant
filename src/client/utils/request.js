const request = ({ url, method }) => {

    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
        // body: JSON.stringify({ data: "test" })
    })
        .then(res => res.json())
        .then(data => {
            return data;
        }).catch(e => {
            console.log(e);
        });
}

export default request;