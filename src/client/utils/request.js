const request = ({ url, options }) => {
    const commonOptions = {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }
    const combinedOptions = { ...commonOptions, ...options };
    return fetch(url, combinedOptions)
        .then(response => {
            if (combinedOptions.method === "DELETE") {
                return response.text();
            }
            return response.json();
        });
}

export default request;