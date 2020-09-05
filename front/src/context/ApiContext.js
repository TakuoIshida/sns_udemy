import React, { createContext, useState, useEffect} from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
export const ApiContext = createContext()

const ApiContextProvider = (props) => {

    const token = props.cookies.get('current-token')
    const [profile, setProfile] = useState([])
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

    const editedProfile = async() => {
        const editData = new FormData()
        editData.append("nickName", editedProfile.nickName)
        cover.name && editData.append('img', cover, cover.name)
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

    const sendDMCont = async(uploadDM) => {
        try {
            const message_urls = 'http://localhost:8000/api/dm/message'
            await axios.post(message_urls, uploadDM,  {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
        }
        catch {
            console.log("error")
        }
    }
    // 相手が承認後、リクエストユーザーにapproved=trueを返して、メッセージ許可を出す関数
    const changeApprovalRequest = async(uploadDataAsk, ask) => {
        try {
            const ask_urls = `http://localhost:8000/api/user/approval/${ask.id}`
            const res = await axios.post(ask_urls, uploadDataAsk,  {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            setAskList(askList.map(item=>(item.id===ask.id? res.data : item)))
            const newDataAsk = new FormData()
            newDataAsk.append("askTo", ask.askFrom)
            newDataAsk.append("approved", true)

            // 万一、申請時に同時に相手も申請していた場合を考慮し、更新のPUT処理を追加する
            const newDataAskPut = new FormData()
            newDataAskPut.append("askTo", ask.askFrom)
            newDataAskPut.append("askFrom", ask.askTo)
            newDataAskPut.append("approved", true)
            // item.askFrom === profile.userPro : 承認を出す側がログインユーザーと一致しているか？
            // item.askTo === ask.askFrom　：　承認する先が、リクエストを送ってくれた相手（askFrom）と一致しているか？
            // 両方の条件を満たせば、resp = trueとなる
            const resp = askListFull.filter(item => {return (item.askFrom === profile.userPro && item.askTo === ask.askFrom)})
            // respがなければ、→　POSTで新規追加、あれば、PUTで更新
            !resp[0]?
            await axios.post('http://localhost:8000/api/user/approval/', newDataAsk, {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
            :
            await axios.put(`http://localhost:8000/api/user/approval/${resp[0].id}`, newDataAskPut, {
                headers: {
                    'ContentType': 'appilcation/json',
                    'Authorization': `Token ${token}`
                }
            })
        }
        catch {
            console.log("error")
        }
    }
    return (
        <ApiContext.Provider value={{
            profile,
            profiles,
            cover,
            setCover,
            askList,
            askListFull,
            inbox,
            newRequestFriend,
            createProfile,
            editedProfile,
            deleteProfile,
            changeApprovalRequest,
            sendDMCont,
            setEditedProfile
        }}>
            {/* props.の子要素を入れ込む */}
        {props.children}
        </ApiContext.Provider>
    )
}

export default withCookies(ApiContextProvider)
