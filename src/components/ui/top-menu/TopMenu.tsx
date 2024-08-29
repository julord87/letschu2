import Link from "next/link"
import { titleFont } from "@/config/fonts"

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
        
    {/* Logo */}
    <div>
        <Link
            href={"/"}>
                <span className={`${titleFont.className} antialiased font-bold`}>Letschu</span>
        </Link>
    </div>


    </nav>
  )
}
