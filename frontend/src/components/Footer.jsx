import React from 'react'

function Footer() {
    return (
        <footer className="bg-black text-white text-xs">
            <div className="mx-auto w-full max-w-screen-xl pt-2">
                <div className="grid grid-cols-2 gap-2 px-4 py-2 lg:py-8 md:grid-cols-4">
                    <div className="text-center">
                        <h2 className="mb-2 font-semibold uppercase">Ace Pickleball</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2"><a href="https://www.google.com/search?sca_esv=8112e37800fc550f&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzeamXUVkpfySivlT__8Y-_F3UYSFE58pbrn2lbuze_3kccv49LOaL3drFk0BKdDJ5x1Vh1BrnY7T3ZoscNuoZjEc8XPINZO2LhiQRMM0sGMUh2F_WA%3D%3D&q=Ace+Pickleball+Club+Reviews&sa=X&ved=2ahUKEwjR1-ubtqCMAxWqT2wGHcbFBr4Q0bkNegQILxAD&biw=1536&bih=872&dpr=1.25" className="hover:underline">Reviews</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                            <li className="mb-2"><a href="https://www.google.com/maps/dir//inside+RGPM+College,+Rajharsh+Colony,+Kolar+Rd,+Sankhedi,+Bhopal,+Madhya+Pradesh+462042/@23.161284,77.3519262,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x397c45208d6a8dbf:0x9ef1e50977a86392!2m2!1d77.4343278!2d23.1613054?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" className="hover:underline">Location</a></li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h2 className="mb-2 font-semibold uppercase">Socials</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2"><a href="" className="hover:underline">Facebook</a></li>
                            <li className="mb-2"><a href="https://www.instagram.com/acepickleballclubbhopal/" className="hover:underline">Instagram</a></li>
                            <li className="">
                                <a href="tel:+919876543210" className="hover:underline">Contact Us</a>
                            </li>

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
