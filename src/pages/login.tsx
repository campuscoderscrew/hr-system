import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '~/components/navbar';

const users = [
  { username: 'admin', password: 'password123', userType: 'admin' },
  { username: 'user1', password: 'secret', userType: 'member' },
];

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = users.find((item) => item.username === username.trim());
    if (user && user.password === password) {
      setError('');
      navigate('/members');
      return;
    }

    setError('Username or password is incorrect.');
  };

  return (
    <div>
      <NavBar/>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-slate-900">Log in to HR System</h1>
            <p className="mt-2 text-sm text-slate-500">Enter your credentials to access the spreadsheet dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Enter password"
                required
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
