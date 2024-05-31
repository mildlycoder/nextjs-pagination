// components/UserCard.tsx

import { motion } from 'framer-motion';

interface User {
  ID: string;
  FirstNameLastName: string;
  JobTitle: string;
  Company: string;
  Email: string;
  EmailAddress: string;
  Phone: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <motion.div
      className="max-w-sm rounded overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg p-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{user.FirstNameLastName}</div>
        <p className="text-gray-700 text-base">
          <strong>Job Title:</strong> {user.JobTitle}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Company:</strong> {user.Company}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Email:</strong> {user.Email}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Alternate Email:</strong> {user.EmailAddress}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Phone:</strong> {user.Phone}
        </p>
      </div>
    </motion.div>
  );
};

export default UserCard;

