import React, { createContext, useState, useEffect} from 'react'
import { withCookies } from 'react-cookie'
import axios from 'aios'
export const ApiContext = createContext()

const ApiContext = (props) => {

    const token = props.cookies.get('current-token')
    const [profile, setProfile] = userState([])
    const [profiles, setProfiles] = useState([])
    const [editedProfile, setEditedProfile] = useState({id: '', nickName: ''})
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

    const createProfile = async() => {
        const createData = new FormData()
        createData.append("nickName", editedProfile.nickName)
        // cover.name　があれば、 &&以降を実行する
        cover.name && createData.append('img', cover, cover.name)
        try {
            const profile_urls = 'http://localhost:8000/api/user/proifle/'
            const res = await axios.post(profile_urls, createData, {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfile(res.data)
            setEditedProfile({ id: res.data.id, nickName: res.data.nickName})
        }
        catch {
            console.log("error")
        }
    }
    const deleteProfile = async() => {
        try {
            const delete_urls = `http://localhost:8000/api/user/profile/${profile.id}`
            const res = await axios.post(delete_urls, {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            // 自分以外を表示
            setProfiles(profiles.filter(dev => dev.id !==profile.id))
            // 空にする
            setProfile([])
            setEditedProfile({ id: '', nickName: ''})
            setCover([])
            setAskList([])
        }
        catch {
            console.log("error")
        }
    }

    const editedPrifile = async() => {
        const editData = new FormData()
        editData.append("nickName", editedProfile.nickName)
        cover.name && editData.append('img', coer, cover.name)
        try{
            const edited_urls = `http://localhost:8000/api/user/profile/${profile.id}`
            const res = await axios.put(edited_urls, editData,  {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfile(res.data)

        }
        catch {
            console.log("error")
        }
    }

    const newRequestFriend = async(askData) => {
        try {
            const appproval_urls = 'http://localhost:8000/api/user/approval'
            const res = await axios.post(appproval_urls, askData,  {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            setAskListFull([...askListFull, res.data])
        }
        catch {
            console.log("error")
        }
    }
    return (
        <div>

        </div>
    )
}

export default ApiContext
