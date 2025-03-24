export interface UserProps {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    
}

export interface LocationProps {
    id?: number;
    name?: string;
}

export interface GovernmentPermitProps {
    id?: number;
    name?: string;
}

export interface CompanyPlantProps {
    id?: number;
    name?: string;
}

export interface PropertyProps {
    id?: number;
    propertyNo?: number;
    location?: number;
    company_owner?: string
    address?: string
}

export interface PermitProps {
    id?: number;
    government_agency?: number;
    permit_type?: string;
    requirement?: string;
    company_plant?: number;
    frequency?: string;
    in_charge?: string;
    contact_no?: string;
    permit_no?: string;
    permit_date?: string;
    renewal?: string;
    permit_conditions?: string;
    recomendation?: string;
    filename?: string;
}

export interface FilesProps {
    id?: number;
    filename?: string
    entityId?: number;
}