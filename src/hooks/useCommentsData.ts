import React, { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";
import axios from "axios";
// get Post's comments by ID from Reddit:

interface ICommentsData {
    id: string;
    userName: string;
    dated: number;
    text: string;
    replies?: any;
}

export function useCommentsData(id: string) {
    const [comments, setComments] = useState<Array<ICommentsData>>([]);
    const token = useContext(tokenContext);

    function mapComments(redditDataArray: Array<any>): Array<ICommentsData> {
        return redditDataArray.map((item: { data: any }) => ({
            id: item.data.id,
            userName: item.data.author,
            dated: item.data.created_utc,
            text: item.data.body,
            replies: (item.data.replies && item.data.replies !== "")
                ? mapComments(item.data.replies.data.children.filter((child: { kind: string; }) => child.kind == 't1'))
                : "",
        }));
    }

    useEffect(()=> {
        setComments([]); //clear
    }, [id])

    useEffect(() => {
        if (!id && id === "") return;
        if (!token || token === "undefined") return;
        axios.get(`https://oauth.reddit.com/comments/${id}`, {
            headers: { Authorization: `bearer ${token}` }
        })
            .then((res) => {
                const comments: Array<ICommentsData> = mapComments(res.data[1].data.children);
                console.log('Comments:', comments);
                setComments(comments);
            })
            .catch(e => {
                console.log(e)
            })
    }, [id])

    return comments
}