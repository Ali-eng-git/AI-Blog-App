import BlogNavbar from "./BlogNavbar"


const BlogLayout = ({children, activeMenu}) => {
  return (
    <div className='bg-white'>
        <BlogNavbar activeMenu={activeMenu}/>
         
         <div className='container mx-auto px-5 md:px-0 mt-4'>{children}</div>
    </div>
  )
}

export default BlogLayout
