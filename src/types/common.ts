export interface ConfirmDeleteListItemPopupData {
    name: string;
    id: number;
}

export interface ConfirmDeleteListItemPopup {
    isOpen: boolean;
    isLoading: boolean;
    data: ConfirmDeleteListItemPopupData;
}

export interface SetConfirmDeleteItemPopupPayload {
    isOpen: boolean;
    id?: number;
}
