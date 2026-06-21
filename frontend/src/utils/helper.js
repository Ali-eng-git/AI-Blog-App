export const getInitials=(title)=>{
 if(!title) return;

 const words =title.split(" ");
 let initials="";

 for (let i = 0; i < Math.min(words.length,2); i++) {
    initials += words[i][0]
    
 }
 return initials.toUpperCase();
}

export const validateEmail=(email)=>{
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

export const getToastMessageByType =(type)=>{
   switch (type) {
      case "edit":
          return "Blog post updated successfully"
      case "draft":
         return "Blog post saved as draft sucessfully"
      case "published":
         return "Blog post published sucessfully"
      default:
        return "Blog post published sucessfully"
   }
}

export const getExcerpt = (text = "", length = 120) => {
  return text
    .replace(/[#*`]/g, "")
    .replace(/\n/g, " ")
    .trim()
    .slice(0, length) + "...";
};