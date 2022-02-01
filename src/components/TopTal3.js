import React, { useState } from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

const arr = ["hello", "yes", "hey", "we", "ten", "unity", "align", "be"];



// the exported component can be either a function or a class

export default function Autocomplete({ onSelectItem }) {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const debounce = (func) => {
        let timer;
        return function(...args){
            const context =  this;
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, DEBOUNCE_DELAY)
        }
    }

    const handleChange = async (e) => {
        const {value} = e.target
        console.log("ran me")
        setLoader(true);
        const response = await axios.get(`${ITEMS_API_URL}?q=${value}`);
        setData(response.data);
        setLoader(false);
    };

    return (
        <div className="wrapper">
            <div className={`control ${loader && 'is-loading'}`}>
                <input type="text" onChange={debounce(handleChange)} className="input" />
            </div>
            {
                arr.length > 0 && 
                <div className="list is-hoverable">
                {
                    arr.map((item) => {
                        return (
                            <div key={item} className='list-item' onClick={() => onSelectItem(item) }>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            }

        </div>
    );
}