import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import ICardData from '../models/Cards';
import { getPosts } from '../services/cardService';
import Card from '../components/Card';
import { toast } from 'react-toastify';

const MainContent: React.FC = () => {
  const [cardsData, setCardsData] = useState<ICardData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        setCardsData(fetchedPosts);
      } catch (error) {
        // Handle errors here
        toast.error('Error fetching posts');
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-semibold">Welcome to our Fake Website</h2>
      <p className="text-gray-600 mt-4">This is a fake landing page created using React, TypeScript, and Tailwind CSS.</p>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">Key Features</h3>
        <ul className="list-disc list-inside mt-2 ml-4">
          <li>Responsive Design</li>
          <li>Modern UI with Tailwind CSS</li>
          <li>Easy to Customize</li>
          <li>Fast and Lightweight</li>
        </ul>
      </section>

      <section className="my-8">
        <h3 className="text-xl font-semibold">Get Started Today</h3>
        <p className="text-gray-600 mt-2">Join our community and experience the benefits of our fake website.</p>
        <Button variant="primary" title="Primary Button" onClick={() => console.log('Primary button clicked')}></Button>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsData && cardsData.map(post => <Card body={post.description} title={post.title} key={post.id} />)}
      </div>
    </main>
  );
};

export default MainContent;
