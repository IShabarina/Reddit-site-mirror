import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { tokenContext } from "../shared/context/tokenContext";

// get user's data:

interface IUserData {
    name?: string;
    iconImg?: string;
}

export function useUserData() {
    const [data, setData] = useState<IUserData>({});
    const token = useContext(tokenContext);

    useEffect(() => {
        if (!token || token === "undefined") return;
        axios.get('https://oauth.reddit.com/api/v1/me.json',
            {
                headers: { Authorization: `bearer ${token}` }
            })
            .then((resp) => {
                const userData = resp.data;
                const icon = userData.icon_img.split('?')[0];
                console.log(userData);
                setData({ name: userData.name, iconImg: icon });
            })
            .catch(e => {
                console.log('User access Error: ', e);
            })
    }, [token])

    return [data]
}