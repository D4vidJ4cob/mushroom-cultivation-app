import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center pt-20">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! We couldn't find this request.</p>
      <Link to="/" className="text-amber-600 hover:underline font-medium">
        Back to home
      </Link>
    </div>
  );
}
