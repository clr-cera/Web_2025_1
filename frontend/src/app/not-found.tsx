"use client";

// app/not-found.js
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    redirect('/');
  }, []);
  return null;
}