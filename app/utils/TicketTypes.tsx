
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
    user: {
        name: string;
        email: string;
    };
};

export type TicketResponse = {
    data: Ticket[];
    meta: {
        total: number;
    };
};

export type UserTicketsResponse = {
    data: {
        user: User;
        tickets: Ticket[];
    };
    meta: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
};

export type StatsResponse = {
    data: {
        total_tickets: number;
        unprocessed_tickets: number;
        user_with_most_tickets: {
            name: string;
            email: string;
            ticket_count: number;
        };
        last_ticket_processed: {
            id: number;
            subject: string;
            content: string;
            status: boolean;
            created_at: string;
            updated_at: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
};