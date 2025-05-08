import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 flex justify-between items-center w-full h-16 fixed z-50 px-4 md:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h4 className="font-bold text-lg">Bachi<span className="text-amber-500">Coins</span></h4>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 cursor-pointer py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
              Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="px-4 cursor-pointer py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200 font-medium"
          >
            Crear cuenta
          </Link>
        </div>
      </nav>
      <main className="h-screen w-screen flex items-center justify-center relative">
        <div className="absolute w-full h-full flex">
          <img src="/cobach.gif" alt="backgorund image" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="flex flex-col gap-10 w-[70%] text-white relative">
          <h1 className="text-5xl font-bold">Bachi<span className="text-amber-300">Coins</span> para todos</h1>
          <p className="text-xl">
          Este sistema introduce una moneda virtual interna que funciona como un mecanismo de reconocimiento y motivación para los estudiantes. 
          A través de la acumulación de estas monedas, obtenidas por logros académicos, comportamiento ejemplar o participación extracurricular,
          los alumnos pueden acceder a recompensas, beneficios o experiencias exclusivas dentro del entorno escolar.
          </p>
        </div>
      </main>
      <div className="py-20 px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ranking de estudiantes top</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="coins-desc">Coins: High to Low</option>
                <option value="coins-asc">Coins: Low to High</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BachiCoins</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">1</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-medium">JC</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Juan Carlos</div>
                          <div className="text-sm text-gray-500">juan.carlos@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">551</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-amber-500 font-bold">42</span>
                        <svg className="w-5 h-5 text-amber-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 7.94l4.06-4.06 4.06 4.06h-2.12v4.12H8.06V7.94H5.94z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">2</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-medium">MM</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">María Martínez</div>
                          <div className="text-sm text-gray-500">maria.m@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">105</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-amber-500 font-bold">18</span>
                        <svg className="w-5 h-5 text-amber-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 7.94l4.06-4.06 4.06 4.06h-2.12v4.12H8.06V7.94H5.94z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">3</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-medium">LD</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Luis Díaz</div>
                          <div className="text-sm text-gray-500">luis.diaz@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">403</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-amber-500 font-bold">33</span>
                        <svg className="w-5 h-5 text-amber-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 7.94l4.06-4.06 4.06 4.06h-2.12v4.12H8.06V7.94H5.94z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">4</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-medium">AM</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Ana Méndez</div>
                          <div className="text-sm text-gray-500">ana.mendez@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">405</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-amber-500 font-bold">27</span>
                        <svg className="w-5 h-5 text-amber-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 7.94l4.06-4.06 4.06 4.06h-2.12v4.12H8.06V7.94H5.94z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
