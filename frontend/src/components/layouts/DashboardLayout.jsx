import { useContext } from "react"
import { UserContext } from "../../context/userContent"
import SideMenu from "./SideMenu"
import Navbar from "./Navbar"


const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext)

  return (
    <>
     <div className="">
      <Navbar activeMenu={activeMenu}/>

      { user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} setOpenSideMenu={()=>{}}/>
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
     </div>
    </>
  )
}

export default DashboardLayout
