
export const isAuthenticated=()=>{
    const token=localStorage.getItem('jwt');

    if(token){
        return true;
    }else{
        return false;
    }
}