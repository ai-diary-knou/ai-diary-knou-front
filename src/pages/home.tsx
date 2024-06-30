import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch, clearUser, setUser } from '../store/store.ts'

function Home() {
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    key: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
          
          <form>
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-gray-700">Nickname</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your nickname"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="key" className="block text-gray-700">Key</label>
              <input
                type="text"
                id="key"
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your key"
              />
            </div>

            <label htmlFor="result" className="block text-gray-700">result</label><br></br>
            <label htmlFor="result_email" className="block text-gray-700">이메일: {selector.user.email}</label>
            <label htmlFor="result_nickname" className="block text-gray-700">닉네임: {selector.user.nickname}</label>
            <label htmlFor="result_password" className="block text-gray-700">비밀번호: {selector.user.password}</label>
            <label htmlFor="result_key" className="block text-gray-700">키: {selector.user.key}</label>
            
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {dispatch(setUser(formData))}}>
              set button
            </button>
            <br></br>
            <br></br>
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {dispatch(clearUser())}}>
              clear button
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;