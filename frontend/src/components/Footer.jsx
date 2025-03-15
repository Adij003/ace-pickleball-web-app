import React from 'react'

function Footer() {
  return (
    <footer class="bg-black text-white text-xs">
    <div class="mx-auto w-full max-w-screen-xl">
        <div class="grid grid-cols-2 gap-2 px-4 py-2 lg:py-8 md:grid-cols-4">
            <div class="text-center">
                <h2 class="mb-2 font-semibold uppercase">Company</h2>
                <ul class="text-gray-400">
                    <li class="mb-2"><a href="#" class="hover:underline">About</a></li>
                    <li class="mb-2"><a href="#" class="hover:underline">Careers</a></li>
                    <li class="mb-2"><a href="#" class="hover:underline">Brand Center</a></li>
                    <li class="mb-2"><a href="#" class="hover:underline">Blog</a></li>
                </ul>
            </div>
            <div class="text-center">
                <h2 class="mb-2 font-semibold uppercase">Help Center</h2>
                <ul class="text-gray-400">
                    <li class="mb-2"><a href="#" class="hover:underline">Discord Server</a></li>
                    <li class="mb-2"><a href="#" class="hover:underline">Twitter</a></li>
                    <li class="mb-2"><a href="#" class="hover:underline">Facebook</a></li>
                    <li class=""><a href="#" class="hover:underline">Contact Us</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="px-4 py-2 bg-gray-900 text-gray-400 text-center">
        <span>© 2025 Ace Pickleball Club Bhopal. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer
