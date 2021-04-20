import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result=>{
                setPics(result.mypost)
            })
    }, [])

    return (
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
                    <h4>{state?state.name:"loading.."}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>40 post</h6>
                        <h6>1000 Followers</h6>
                        <h6>40 Followings</h6>
                     </div>
                
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                               )
                    })
                }
             
            </div>

        </div>

    )
}

export default Profile