import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock("axios", () => ({
  post: jest.fn(),
}));

// eslint-disable-next-line import/first
import ShortenUrlPage from './ShortenUrlPage';

describe('ShortenUrlPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the page correctly', () => {
    render(<ShortenUrlPage />);
    const longUrlInput = screen.getByLabelText(/input your url/i);
    const submitButton = screen.getByText(/shorten/i);
    expect(longUrlInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('long url posted correctly', async () => {
    render(<ShortenUrlPage />);
    const longUrl = 'https://www.example.com/this-is-a-very-very-long-url';
    const shortUrl = 'http://localhost:3000/abc123';
    axios.post.mockResolvedValueOnce({ data: shortUrl });
    const longUrlInput = screen.getByLabelText(/input your url/i);
    const submitButton = screen.getByText(/shorten/i);
    fireEvent.change(longUrlInput, { target: { value: longUrl } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/shortenUrl',
      { longUrl: longUrl },
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  test('short url displays correctly', async () => {
    render(<ShortenUrlPage />);
    const longUrl = 'https://www.example.com/this-is-a-long-url';
    const shortUrl = 'http://localhost:3000/abc123';
    axios.post.mockResolvedValueOnce({ data: shortUrl });
    const longUrlInput = screen.getByLabelText(/input your url/i);
    const submitButton = screen.getByText(/shorten/i);
    fireEvent.change(longUrlInput, { target: { value: longUrl } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const shortUrlLink = screen.getByRole('link', { href: shortUrl });
      expect(shortUrlLink).toBeInTheDocument();
    });
  });
});
