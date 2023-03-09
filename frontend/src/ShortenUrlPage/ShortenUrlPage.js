import React, { useState } from 'react';
import axios from 'axios';
import "./ShortenUrlPage.css"

const ShortenUrlPage = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (event) => {
        setShortUrl('');
        setErrorMsg('');
        event.preventDefault();
        await axios.post('http://localhost:8080/shortenUrl', { longUrl: longUrl }, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
            setShortUrl(res.data);
        })
        .catch((err) => {
            console.log(err);
            setErrorMsg(err.response.data.message);
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="longUrl">Input your URL:</label>
                <input
                    id="longUrl"
                    type="text"
                    value={longUrl}
                    onChange={(event) => setLongUrl(event.target.value)}
                />
                <button type="submit">Shorten</button>
                {shortUrl && (
                    <p>
                        Short URL: <a href={shortUrl}>{shortUrl}</a>
                    </p>
                )}
                {errorMsg && <p className="error">Error: {errorMsg}</p>}
            </form>
        </div>
    );
};

export default ShortenUrlPage;
