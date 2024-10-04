"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SearchPage = () => {
  const router = useRouter();
  const { key } = useParams();

  useEffect(() => {
    if (key) {
      console.log('Searching for:', key);
    }
  }, [key]);

  return (
    <div>
      <h1>Search Results for "{key}"</h1>
    </div>
  );
};

export default SearchPage;
