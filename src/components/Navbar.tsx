import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    navList: { name: string, path: string }[]
}

const Navbar: React.FC<Props> = ({ navList }) => {
    return (
        <nav>
            <ul>
                {
                    navList.map((navItem, index) => (
                        <li key={index}>
                            <Link to={navItem.path}>{navItem.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar