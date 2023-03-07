import React, { useState } from 'react';
import axios from 'axios';
import "./ShortenUrlPage.css"

const ShortenUrlPage = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:3000/shortenUrl', { longUrl: longUrl }, { headers: { 'Content-Type': 'application/json' } });
        console.log(response);
        setShortUrl(response.data);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="longUrl">Long URL:</label>
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
            </form>
        </div>
    );
};

export default ShortenUrlPage;
