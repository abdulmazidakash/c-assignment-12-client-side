import React from 'react'

export default function MeetOurTeam() {
  return (
    <div className='container mx-auto my-8 py-12 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
      {/* Team Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Meet Our Team</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          A passionate group of individuals dedicated to student success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
        {/* Team Member 1 */}
        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://i.pravatar.cc/150?img=4"
            alt="Team Member"
            className="rounded-full mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
          <h3 className="text-lg font-semibold mt-4">John Doe</h3>
          <p className="text-gray-600 dark:text-gray-300">Founder & CEO</p>
        </div>

        {/* Team Member 2 */}
        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Team Member"
            className="rounded-full mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
          <h3 className="text-lg font-semibold mt-4">Jane Smith</h3>
          <p className="text-gray-600 dark:text-gray-300">CTO & Developer</p>
        </div>

        {/* Team Member 3 */}
        <div className="card bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://i.pravatar.cc/150?img=6"
            alt="Team Member"
            className="rounded-full mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
          <h3 className="text-lg font-semibold mt-4">Emily White</h3>
          <p className="text-gray-600 dark:text-gray-300">Marketing & Partnerships</p>
        </div>
      </div>
    </div>
  )
}
