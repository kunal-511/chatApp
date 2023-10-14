import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        position={'relative'}
        
        left={'1'}
        colorScheme="green"
        padding={'0'}
        width={'10'}
        h={'10'}
        borderRadius={'full'}
        onClick={onOpen}
       
      >
        <BiMenuAltLeft size={'20'} />
      </Button>
   
      
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>TalkBuddy</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
              <Button onClick={onClose} variant={'ghost'} colorScheme='purple'>
                <Link to={"/"}>Home</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme='purple'>
                <Link to={"/videos"}>New Features</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme='purple'>
                <Link to={"/videos?category=free"}>New Features</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme='purple'>
                <Link to={"/upload"}>Upload Videos</Link>
              </Button>
            </VStack>
            <HStack position={'absolute'} bottom={'10'} left={'0'} justifyContent={'space-evenly'} width={'full'}>
<Button onClick={onClose} colorScheme='purple'>
  <Link>Log In</Link>
</Button>
<Button onClick={onClose} colorScheme='purple'  variant={'outline'}>
  <Link>Sign Up</Link>
</Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Hamburger;
