export const addTodo = (list, item) => [...list, item]

export const generateId = () => Math.floor(Math.random()*1000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete})

export const updateTodo = (list, updated) => {
    const updateIndex = list.findIndex(item => item.id === updated.id)
    return [
        ...list.slice(0, updateIndex),
        updated,
        ...list.slice(updateIndex+1)
    ]
}

export const removeTodo = (list, id) => {
    const removeIndex = list.findIndex(item => item.id === id)
    return [
        ...list.slice(0, removeIndex),
        ...list.slice(removeIndex+1)
    ]
}


export const filterTodos = (list, route) => {
    switch(route){
        case '/active':
            return list.filter(item => !item.isComplete)
        case '/complete':
            return list.filter(item => item.isComplete)
    
        default:
            return list
    }
}