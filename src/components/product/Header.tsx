import { ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleBack = () => {
        if (location.pathname === "/") {
            navigate("/")
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="flex items-center gap-2 mb-4">
            <button onClick={handleBack} className="p-1 ">
                <ArrowLeft className="h-5 w-5 text-primary-foreground" />
            </button>
            <h1 className="text-xl font-bold">Travel eSIM</h1>
        </div>
    )
}
