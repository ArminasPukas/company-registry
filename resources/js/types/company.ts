
export type Company = {
    id: number;
    company_code: number;
    company_name: string;
    company_name_slug: string;
    address: string;
    registration_date: string;
    form_code: number;
    form_name: string;
    status_code: number;
    status_name: string;
    formation_date: string;

    created_at: Date;
    updated_at: Date;
};
