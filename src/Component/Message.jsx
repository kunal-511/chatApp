import React from 'react'
import {HStack, Avatar, Text} from "@chakra-ui/react"
const Message = ({text, uri, user="other"}) => {
  return (
       <HStack bg={user === "me" ? "green.300":"gray.300"} borderRadius={'base'} paddingY={'2'} paddingX={'4'} alignSelf={user === "me" ?"flex-end" : "flex-start"} >
         {
          user ==="other" && <Avatar src={uri} />
        }
        <Text color={'black'}>{text}</Text>
        {
          user ==="me" && <Avatar src={uri} />
        }
        
        </HStack> 

  )
}

export default Message;


