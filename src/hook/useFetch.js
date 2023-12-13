import { useEffect, useState } from "react";
import { APIURL } from "../config";

export default function useFetch(apiEndpoint, method = "GET", body = null) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        setError(null);

        const apiUrl = `${APIURL}/${apiEndpoint}`;
        console.log(apiUrl);

        fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: body ? JSON.stringify(body) : null,
            // credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터 가져오기 오류:", error);
                setError(error);
                setLoading(false);
            });
    }, [apiEndpoint, method, body]);

    return { data, loading, error };
}
