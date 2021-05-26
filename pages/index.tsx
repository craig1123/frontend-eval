import React from 'react';
import Link from 'next/link';
import PageLayout from 'components/PageLayout';

const Homepage = () => {
  return (
    <PageLayout page="Welcome.">
      <p>
        I&apos;m building out each project from{' '}
        <a href="https://frontendeval.com/" target="__blank" rel="noopener noreferrer">
          https://frontendeval.com/
        </a>
      </p>
      <ul>
        <li>
          <Link href="/mortgage-calculator">Mortgage Calculator</Link>
        </li>
        <li>
          <Link href="/modal-overlay">Modal Overlay</Link>
        </li>
        <li>
          <a href="https://craig1123.github.io/snake/">Snake Game</a>
        </li>
        <li>
          <Link href="/image-carousel">Image Carousel</Link>
        </li>
      </ul>
    </PageLayout>
  );
};

export default Homepage;
