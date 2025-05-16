import { ENUM_PRIORITY } from "./enum"

export interface ITodo {
    id: string,
    title: string,
    date: string,
    priority: ENUM_PRIORITY
}

export interface IPriority {
    id: string,
    title: string,
    subtitle: string,
    value: ENUM_PRIORITY,
    color: string
}