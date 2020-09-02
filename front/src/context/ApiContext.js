import React, { createContext, useState, useEffect} from 'react'
import { withCookies } from 'react-cookie'
import axios from 'aios'
export const ApiContext = createContext()

const ApiContext = (props) => {

    const token = props.cookies.get('current-token')
    const [profile, setProfile] = userState([])
    const [profiles, setProfiles] = useState([])
    const [editedProfile, setEditedProfile] = useState({"id": '', "nickName": ''})
    const [askList, setAskList] = useState([])
    const [askListFull, setAskListFull] = useState([])
    const [inbox, setInbox] = useState([])
    const [cover, setCover] = useState([])

    useEffect(() => {
        const getMyProfile = async() => {
            try {
                const myprofile_urls = 'http://localhost:8000/api/user/myprofile/'
                const resmy = await axios.get(myprofile_urls, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                const res = await axios.get(myprofile_urls, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                resmy.data[0] && setProfile(resmy.data[0])
                resmy.data[0] && setEditedProfile({ id: resmy.data[0].id, profile: resmy.data[0].nickName })
                resmy.data[0] && setAskList(res.data.filter(ask=> {return resmy.data[0].userPro === ask.askTo}))
                setAskListFull(res.data)
            }
            catch {
                console.log("error");
            }
        }
        const getProfile = async() => {

            try{
                const profile_urls = 'http://localhost:8000/api/user/profile/'
                const res = await axios.get('profile_urls',  {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setProfiles(res.data)
            }
            catch {
                console.log("error");
            }
        }
        // DMの受信箱
        const getInbox = async() => {
            try {
                const inbox_urls = 'http://localhost:8000/api/dm/inbox'
                const res = await axios.get(inbox_urls, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setInbox(res.data)
            }
            catch {
                console.log("error");
            }
        }
        getMyProfile()
        getProfile()
        getInbox()
    }, [token, profile.id])
    return (
        <div>

        </div>
    )
}

export default ApiContext
