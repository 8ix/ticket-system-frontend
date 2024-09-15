import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    VStack,
    HStack,
    Badge,
} from '@chakra-ui/react';
import { Ticket } from '../utils/TicketService';

type TicketModalProps = {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
};

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, ticket }) => {
    if (!ticket) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ticket Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        <HStack>
                            <Text fontWeight="bold">ID:</Text>
                            <Text>{ticket.id}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Subject:</Text>
                            <Text>{ticket.subject}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Status:</Text>
                            <Badge colorScheme={ticket.status ? "green" : "red"}>
                                {ticket.status ? "Open" : "Closed"}
                            </Badge>
                        </HStack>
                        <VStack align="start">
                            <Text fontWeight="bold">Content:</Text>
                            <Text>{ticket.content}</Text>
                        </VStack>
                        <HStack>
                            <Text fontWeight="bold">Created At:</Text>
                            <Text>{new Date(ticket.created_at).toLocaleString()}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Updated At:</Text>
                            <Text>{new Date(ticket.updated_at).toLocaleString()}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Assigned To:</Text>
                            <Text>{ticket.user.name}</Text>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TicketModal;