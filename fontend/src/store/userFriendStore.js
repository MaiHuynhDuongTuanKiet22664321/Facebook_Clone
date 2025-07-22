import { deleteUserFromRequest, followUser, getAllFriendsRequest, getAllFriendsSuggestion, getMutualFriends, UnfollowUser } from "@/service/user.service";
import toast from "react-hot-toast";
import { create } from "zustand";
import{
  getPostsByUserIds
}from "@/service/post.service"






export const userFriendStore = create((set,get) => ({
    friendRequest:[],
    friendSuggestion:[],
    mutualFriends:[],
    loading:false,
    currentUserId: null,
    setCurrentUserId: (id) => set({ currentUserId: id }),

   fetchFriendRequest: async() =>{
    set({loading:true})
    try {
          const friend = await getAllFriendsRequest();
          set({friendRequest: friend.data, loading:false})
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },

   fetchFriendSuggestion: async() =>{
    set({loading:true})
    try {
          const friend = await getAllFriendsSuggestion();
          set({friendSuggestion: friend.data, isLoading:false})
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },
   fetchMutualFriends: async(userId) =>{
    set({loading:true})
    try {
          const friend = await getMutualFriends(userId);
          set({mutualFriends: friend, loading:false})
          console.log(friend);
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },
   fetchInformationPostMutualFriends: async(userId) =>{
    set({loading:true})
    try {
          const friend = await getMutualFriends(userId);
          const userIds = friend.map((item) => item._id);
          if (Array.isArray(userIds) && userIds.length > 0) {
            const result = await getPostsByUserIds(userIds);
            set({informationPostMutualFriends: result.data, loading:false})
          } else {
            set({informationPostMutualFriends: [], loading:false})
          }
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },
   followUser:async(userId) =>{
    set({loading:true})
    try {
        await followUser(userId)
    } catch (error) {
      set({error, loading:false})
    }
   },
   UnfollowUser: async(userId) =>{
    set({loading:true})
    try {
        await UnfollowUser(userId)
    } catch (error) {
      set({error, loading:false})
    }
   },
   deleteUserFromRequest: async(userId) =>{
    set({loading:true})
    try {
        await deleteUserFromRequest(userId)
        toast.success("Bạn đã xóa lời mời kết bạn thành công")
        // Cập nhật lại danh sách
        await get().fetchFriendRequest();
        await get().fetchMutualFriends(userId); // Nếu cần cập nhật bạn chung
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa lời mời kết bạn");
      set({error, loading:false})
    } finally {
      set({loading:false})
    }
   }

}))