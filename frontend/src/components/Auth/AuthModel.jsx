import { UserContext } from "../../context/userContent"
import { useContext } from "react"
import { useState } from "react"
import Modal from "../Modal"
import Login from "./Login"
import SignUp from "./SignUp"

const AuthModel =()=>{
    const {openAuthForm,setopenAuthForm} = useContext(UserContext)
    const [currentPage, setCurrentPage] = useState("login")

    return (
        <>
        <Modal
        isOpen={openAuthForm}
        onClose={()=>{
            setopenAuthForm(false)
            setCurrentPage("login");
        }}
        hideHeader
        >
            <div className="">
                {currentPage === "login" && <Login setCurrentPage={setCurrentPage}/>}
                {currentPage === "signup" && (
                    <SignUp setCurrentPage={setCurrentPage}/>
                )}
            </div>
        </Modal>
        </>
    )
}

export default AuthModel