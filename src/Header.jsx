import { Box, Heading, Button} from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <>
      <Box bg={'green.200'}>
<Heading marginLeft={'4'} fontSize={'5xl'}  h={'16'}>TalkBuddy</Heading>
      </Box>
    </>
  )
}

export default Header
