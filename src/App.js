import * as React from 'react';
import './App.css'

const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
    )

    React.useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key])

    return [value, setValue]
}


const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ]

    const [searchTerm, setSearchTerm] = useSemiPersistentState(
        'search',
        'React'
    )

    React.useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const searchedStores = stories.filter(
        (story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <strong>Search:</strong>
            <InputWithLabel
                id={'search'}
                value={searchTerm}
                onInputChange={handleSearch}
            />

            <hr/>
            <List list={searchedStores}/>
        </div>
    )
}

const InputWithLabel = ({
    id,
    value,
    type='text',
    onInputChange,
    children
}) => (
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
)

const List = ({list}) => (
    <ul>
        {list.map((item) => (
            <Item key={item.objectID} item={item}/>
        ))}
    </ul>
)

const Item = ({item}) => (
    <li key={item.objectID}>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span> {item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
    </li>
)

export default App;
