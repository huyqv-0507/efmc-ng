export interface BaseResponse {
    success: boolean,
    data: any,
    messageError: any,
    message: Message
}

export interface Message {
    key: string,
    value: string
}
