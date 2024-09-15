import React, { useState, useEffect } from 'react';
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
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import TicketService from '../utils/TicketService';
import  { Ticket, User } from '../utils/TicketTypes';
import Pagination from './Pagination';

type TicketModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string;
};

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, userEmail }) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const ticketService = TicketService.getInstance();
    const perPage = 3;

    useEffect(() => {
        if (isOpen && userEmail) {
            fetchUserTickets(1);
        }
    }, [isOpen, userEmail]);

    const fetchUserTickets = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await ticketService.getUserTickets(userEmail, page, perPage);
            setUser(response.data.user);
            setTickets(response.data.tickets);
            setCurrentPage(response.meta.current_page);
            setTotalPages(Math.ceil(response.meta.total / perPage));
        } catch (error) {
            console.error('Error fetching user tickets:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        fetchUserTickets(newPage);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Tickets</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <VStack align="start" spacing={4}>
                            <HStack>
                                <Text fontWeight="bold">User:</Text>
                                <Text>{user?.name}</Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="bold">Email:</Text>
                                <Text>{user?.email}</Text>
                            </HStack>
                            <TableContainer width="100%">
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Ticket ID</Th>
                                            <Th>Subject</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {tickets.map((ticket) => (
                                            <Tr key={ticket.id}>
                                                <Td>{ticket.id}</Td>
                                                <Td>{ticket.subject}</Td>
                                                <Td>
                                                    <Badge colorScheme={ticket.status ? "green" : "red"}>
                                                        {ticket.status ? "Open" : "Closed"}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Pagination
                                onClickNext={() => handlePageChange(currentPage + 1)}
                                onClickPrev={() => handlePageChange(currentPage - 1)}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        </VStack>
                    )}
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