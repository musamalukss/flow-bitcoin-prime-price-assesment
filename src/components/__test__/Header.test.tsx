import Header from '../Header';
import { cleanup, render, screen } from "@testing-library/react";
import * as ReactDOM from 'react-dom';

afterEach(cleanup)

describe('Header component render test', ()=> {

    let container: HTMLDivElement
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Header/>,container)
    })

    test('Renders initial Header Component',async () =>{

      
        const image = (await container.querySelectorAll('img'));
        const h1 = (await container.querySelectorAll('h1'));        
        // logo image
        expect(image).toHaveLength(1);
        expect(h1).toHaveLength(1);

    })
})




