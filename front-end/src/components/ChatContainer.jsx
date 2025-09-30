import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser._id)
  },[getMessages, selectedUser._id])

  if(isMessageLoading) {
    return(
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  } 


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>Message...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer