import axiosInstance from "./url.service"


//signup user
export const registerUser = async (userData)=>{
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

//login user
export const loginUser = async (userData)=>{
    try {
        const response = await axiosInstance.get('/auth/login', userData);
        if(response?.data.status === "success"){
            return response.data;
        } 
    } catch (error) {
        console.error(error);
    }
}

//logout user
export const logoutUser = async ()=>{
    try {
        const response = await axiosInstance.get('/auth/logout');
        if(response.data.status === "success"){
            return response.data;
        } 
    } catch (error) {
        console.error(error);
    }
}


//check auth api
export const checkUserAuth = async ()=>{
    try {
        const response = await axiosInstance.get('/users/check-auth');
        if(response.data.status === "success"){
            return {isAuthenticated: true, user: response?.data?.data};
        }else if(response.data.status === "error"){
            return {isAuthenticated: false};
        }
    } catch (error) {
        console.error(error);
        return { isAuthenticated: false};
    }
}
