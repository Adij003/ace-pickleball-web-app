import React from 'react'

function Footer() {
  return (
    <footer className="bg-black text-white text-xs">
    <div className="mx-auto w-full max-w-screen-xl pt-2">
        <div className="grid grid-cols-2 gap-2 px-4 py-2 lg:py-8 md:grid-cols-4">
            <div className="text-center">
                <h2 className="mb-2 font-semibold uppercase">Company</h2>
                <ul className="text-gray-400">
                    <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Brand Center</a></li>
                    <li className=""><a href="#" className="hover:underline">Blog</a></li>
                </ul>
            </div>
            <div className="text-center">
                <h2 className="mb-2 font-semibold uppercase">Help Center</h2>
                <ul className="text-gray-400">
                    <li className="mb-2"><a href="#" className="hover:underline">Discord Server</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Twitter</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
                    <li className=""><a href="#" className="hover:underline">Contact Us</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="px-4 py-2 bg-gray-900 text-gray-400 text-center">
        <span>© 2025 Ace Pickleball Club Bhopal. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer
