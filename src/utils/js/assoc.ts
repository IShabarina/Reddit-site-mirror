//принимает 2 аргумента - ключ и значение
export function assoc<K extends string, T>(key: K, value: T) {
    // возвращает фун-цию
    return <O extends object>(obj: O) => ({
        //дкструкция object-а
        ...obj,
        [key]: value,
        // если K (ключ) расширяет О (т.е. если ключ там уже был)
    }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>)
}