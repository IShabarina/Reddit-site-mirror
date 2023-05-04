import { assoc } from "../js/assoc";

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export const assignId = assoc('id', generateRandomString());

// для генерирования рандомного значения при каждом вызове:
export const generateId = <O extends object>(obj: O) =>
    assoc('id', generateRandomString())(obj);

