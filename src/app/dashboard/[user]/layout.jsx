'use client';

import Sidebar from '@/app/Libs/SharedUI/Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 md:p-8 px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout;