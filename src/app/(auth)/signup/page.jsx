'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiFetch from '@/app/Libs/apiFetch.js';
import Loading from '@/app/Libs/SharedUI/Loading/Loading'
import { EMPTY_OBJECT } from '@/app/Libs/Utils/constants'
import Link from 'next/link';

const page = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState(EMPTY_OBJECT)

  const router = useRouter()

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  /*  */
  /* const router = useRouter();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }; */

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const { email, password } = values
    const payload = {
      email,
      password
    }

    const response = await apiFetch({ payload, method: 'POST', url: '/api/profe/signup' })
    if (response.error) {
      setLoading(false)
      setError(response.error)
      return
    }

    setLoading(false)
    router.push('/login')

  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={values.email || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={values.password || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={values.confirmPassword || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              Sign up
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-green-700 hover:text-green-600"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;