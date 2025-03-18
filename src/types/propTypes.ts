export interface InputProps {
    label?: string;
    fontColor?: string;
    type?: string;
    multiple?: boolean;
    name?: string;
    placeholder?: string;
    value?: string | number;
    textColor?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export interface InputDateProps { 
    name?: string;
    label?: string;
    textColor?: string;
    fontColor?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string ;
    disabled?: boolean;
}

export interface TextAreaProps {
    name?: string;
    label?: string;
    textColor?: string;
    fontColor?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string ;
    rows?: number;
    disabled?: boolean;
  }
export interface Option {
    value: number | string;
    title: string;
}
export interface SelecteProps<T> {
    label?: string;
    selection_name?: string;
    name: string;
    options?: Option[];
    value?: number | string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ButtonProps {
    type?: any;
    disabled?: boolean
    onSubmit?: () => void
    onClick?: () => void;
    name?: string;
    wFull?: boolean;
}

export interface LoginProps {
    username: string;
    password: string
}

export interface LoggedUser {
    id?: number | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
}

export interface TableColumn {
    key?: string;
    label?: string;
}

export interface ModalProps {
    id?: number
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    children?: React.ReactNode;
}

export interface ChildrenModalProps {
    id?: number;
    name?: string;
    asset_type?: string;
    modalOpen: boolean;
    isSocketConnected?: boolean;
    setModalOpen: (open: boolean) => void;
    setIsSocketConnected?: (open: boolean) => void;
    onSubmit?: () => void;
}