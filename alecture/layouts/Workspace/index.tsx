import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback,FC } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import gravatar from 'gravatar';
const Workspace:FC = ({children}) =>{
    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher,);
    const onLogout = useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true,
        }).then(()=>{
            mutate(false);
        })
    },[])

    if(!data){
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <ProfileImg src={gravatar.url(data.nickname,{s:"28px",d:'retro'})} alt={data.nickname} />
                </RightMenu>
            </Header>
        <button onClick={onLogout}>로그아웃</button>
        <WorkspaceWrapper>
            <Workspaces>
                test
            </Workspaces>
            <Channels>
                <WorkspaceName>Sleact</WorkspaceName>
                <MenuScroll>
                    MenuScroll
                </MenuScroll>
            </Channels>
            <Chats>Chats</Chats>
        </WorkspaceWrapper>
        {children}
        </div>
    )
}

export default Workspace