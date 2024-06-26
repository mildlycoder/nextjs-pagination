"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';

interface User {
  ID: string;
  FirstNameLastName: string;
  JobTitle: string;
  Company: string;
  Email: string;
  EmailAddress: string;
  Phone: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next`);
      const data = await response.json();
      if (data.users.length === 0) {
        setHasMore(false);
      } else {
        setUsers(data.users);
        setHasMore(true);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setHasMore(false);
    }
    setLoading(false);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageSelect = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 min-h-screen sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {users.map((user) => (
              <UserCard key={user.ID} user={user} />
            ))}
          </AnimatePresence>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <Pagination currentPage={page} onPageSelect={handlePageSelect} />
        <button
          onClick={handleNext}
          disabled={!hasMore}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  onPageSelect: (pageNum: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageSelect }) => {
  const pages = Array.from({ length: currentPage }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2">
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageSelect(pageNum)}
          className={`py-2 px-4 rounded ${pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Users;

