import { Box, Heading, Button, HStack} from '@chakra-ui/react'
import React from 'react'
import Hamburger from './Hamburger'

const Header = () => {
  return (
    <>
      <Box bg={'green.200'}>
        <HStack>
        <Hamburger />
<Heading marginLeft={'4'} fontSize={'5xl'}  h={'16'}>TalkBuddy</Heading>
</HStack>
      </Box>
    </>
  )
}

export default Header
