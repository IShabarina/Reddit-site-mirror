import React, { useContext, useState } from "react";
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Header } from './shared/Header';
import { Layout } from './shared/Layout';
import { Content } from './shared/Content';
import { CardsList } from "./shared/CardsList";
import { useToken } from "./hooks/useToken";
import { tokenContext } from "./shared/context/tokenContext";
import { UserContextProvider } from "./shared/context/userContext";
import { PostsContextProvider } from "./shared/context/postsContext";
import { CommentsListContextProvider } from "./shared/context/commentsListContext";
import { commentContext } from "./shared/context/commentContext";
import { postIdContext } from "./shared/context/postIdContext";

function AppComponent() {
    // state for Comment text from textarea of CommentForm:
    const [commentValue, setCommentValue] = useState('');
    const [postId, setPostId] = useState('');

    //get token on client side via hook useToken:
    const [token] = useToken();

    // global storage for user's input data - use context which up value from CommentForm:
    const CommentContextProvider = commentContext.Provider;
    const PostIdContextProvider = postIdContext.Provider;

    return (
        <CommentContextProvider value={{
            value: commentValue, // get value
            onChange: setCommentValue // change value
        }}>
            <tokenContext.Provider value={token}>
                <UserContextProvider>
                    <Layout>
                        <Header />
                        <Content>
                            <PostsContextProvider>
                                <PostIdContextProvider value={{
                                    value: postId,
                                    onChange: setPostId
                                }}>
                                    <CommentsListContextProvider>
                                        <CardsList />
                                    </CommentsListContextProvider>
                                </PostIdContextProvider>
                            </PostsContextProvider>
                        </Content>
                    </Layout>
                </UserContextProvider>
            </tokenContext.Provider>
        </CommentContextProvider >
    );
}


export const App = hot(() => <AppComponent />);

