import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from  'react-router-dom'

const Profile = () => {
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} =useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`/user/:${userid}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result=>{
            console.log(result)
               // setPics(result.mypost)
               setProfile(result)
            })
    }, [])

    return (
        <>
        {userProfile ? 
        
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: 'flex',
                justifyContent: "space-around",
                margin: "18px 0",
                borderBottom: "1px solid gray"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="http://res.cloudinary.com/darpinsta/image/upload/v1609141652/uoworlaatdv3fsmjr4ye.jpg"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>{userProfile.posts.length} post</h6>
                        <h6>1000 Followers</h6>
                        <h6>40 Followings</h6>
                     </div>
                
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                               )
                    })
                }
             
            </div>

        </div>
        
        
        :<h2>Loading......</h2>}
        
</>
    )
}

export default Profile