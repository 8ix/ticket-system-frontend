import axios from 'axios';

export type User = {
    name: string;
    email: string;
};

export type Ticket = {
    id: number;
    subject: string;
    content: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    user: User;
};

export type TicketResponse = {
    data: Ticket[];
    meta: {
        total: number;
    };
};

export default class TicketService {
    private static instance: TicketService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = process.env.NEXT_API_URL || 'http://localhost/api';
    }

    public static getInstance(): TicketService {
        if (!TicketService.instance) {
            TicketService.instance = new TicketService();
        }
        return TicketService.instance;
    }

    public async getTickets(status: 'open' | 'closed', page: number, perPage: number): Promise<TicketResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/tickets/${status}`, {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${status} tickets:`, error);
            throw error;
        }
    }

    public static formatDate(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }
}