import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { tokenContext } from "../shared/context/tokenContext";

// get array of Posts from Reddit:

interface IPostData {
    id: string;
    author: string;
    avatarImg: string;
    title: string;
    rating: number;
    prevImg: string;
    datePost: number;
    commentsNmb: number;
}

export function usePostsData() {
    const token = useContext(tokenContext);
    const [postsData, setPostsData] = useState<Array<IPostData>>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://oauth.reddit.com/best.json?sr_detail=true',
            {
                headers: { Authorization: `bearer ${token}` }
            })
            .then((res) => {
                const postsData: Array<IPostData> = res.data.data.children.map(
                    (item: { data: any }) => ({
                        id: item.data.id,
                        author: item.data.author,
                        avatarImg: item.data.sr_detail.icon_img,
                        title: item.data.title,
                        datePost: item.data.created_utc,
                        prevImg: item.data.preview
                            ? item.data.preview.images?.[0].source.url.replace(
                                /(\&amp\;)/g,
                                "&"
                            )
                            : "https://b.thumbs.redditmedia.com/PXt8GnqdYu-9lgzb3iesJBLN21bXExRV1A45zdw4sYE.png",
                        rating: item.data.ups,
                        commentsNmb: item.data.num_comments,
                    })
                );
                setPostsData(postsData);
            })
            .catch(e => {
                const error = e as AxiosError
                setError(error.message)
                console.log('Posts data error: ', error.message)
            })
    }, [token]);

    return postsData
}